#!/bin/bash

. .env

if [ ! -n "$FTP_HOST" ]; then
    echo "Missing env_vars"
    exit 2
fi

echo "Usage: " $0 " [option reset key]"

usage() {

  echo ""
  echo "Usage: "$0" [-s] [-r]"
  echo ""
  echo "  -s to Skip Backend Build Step"
  echo "  -n to Skip Frontend Build Step"
  echo "  -r to reset SSH connection"
  echo "  -p to Skip Publish"
  echo ""
}

while getopts rsnp option
do
    case "${option}" in
    r) RESETSSH=true;;
    s) BUILD=true;;
    n) NOBUILDREACT=true;;
    p) NOPUBLISH=true;;
    [?])  usage
        exit 1;;
    esac
done

if [ -z "$BUILD" ]; then
  cd ../backend
  mkdir -p ./build/
  rsync -ravz --exclude-from '../scripts/exclude-from-prep.txt' --delete . ./build/

  rsync -avz  ".env.production"  ./build/.env
  rsync -avz  "../scripts/exclude-from-prod.txt"   ./build/

  cd ./build/
  /usr/local/bin/composer install  --no-dev
  # chmod 755 *.php

  echo "build ready"
  cd ../..
else
  echo "Skip Build"
  cd ..
fi

echo "start frontend build"
pwd
if [ -z "$NOBUILDREACT" ]; then

  cd ./frontend
  npm run build
  buildresult=$?
  if [ $buildresult != 0 ]; then
    echo "REACT Build Fail"
    exit 1
  fi

  cd ..
fi

echo "start upload"

# setup passwordless ssh
if [ ! -z $RESETSSH ]; then
    echo "Reset ssh key"
    ssh-keygen -f $KEY_DIR -R $FTP_HOST
    ssh-copy-id -f -i ~/.ssh/id_rsa -oHostKeyAlgorithms=+ssh-dss $FTP_USER@$FTP_HOST
else
    echo "Skip SSH Reset"
fi

if [ -z "$NOPUBLISH" ]; then
  echo "start upload API"
  cd ./backend/build/
  pwd
  echo $FTP_TARGETFOLDER_API
  rsync -rave  'ssh -oHostKeyAlgorithms=+ssh-dss' \
    --exclude-from 'exclude-from-prod.txt' \
    --delete . $FTP_USER@$FTP_HOST:$FTP_TARGETFOLDER_API/

  ssh  $FTP_USER@$FTP_HOST "chmod -R 755 $FTP_TARGETFOLDER_API/"
  cd ..

  echo "start upload UI"
  cd ./frontend/build/
  pwd
  echo $FTP_TARGETFOLDER_UI
  rsync -rave  'ssh -oHostKeyAlgorithms=+ssh-dss' \
    --delete . $FTP_USER@$FTP_HOST:$FTP_TARGETFOLDER_UI/

  ssh  $FTP_USER@$FTP_HOST "chmod -R 755 $FTP_TARGETFOLDER_UI/"
  cd ../..
fi

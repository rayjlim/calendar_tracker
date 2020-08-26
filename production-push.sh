#!/bin/bash

. ./env_vars.sh

if [ -z "$FTP_HOST" ]; then
    echo "Missing env_vars"
    exit 2
fi

echo "FTP HOST " $FTP_HOST

PREP_DIR='../tracks_prod'
mkdir -p $PREP_DIR

while getopts rsn option; do
  case "${option}" in
    r) RESETSSH=true;;
    s) BUILD=true;;
    n) NOBUILDSPA=true;;
  esac
done

if [ -z $BUILD ]; then
  rsync -ravz  --exclude-from 'production-exclude.txt' --delete . $PREP_DIR
  rsync -avz  _config/bluehost/SERVER_CONFIG.php $PREP_DIR/backend/SERVER_CONFIG.php
  rsync -avz  _config/.htaccess $PREP_DIR/public

  if [ -z "$NOBUILDSPA" ]; then
    cd ui-react-native-web
    npm run build
    buildresult=$?
    if [ $buildresult != 0 ]; then
      echo "SPA Build Fail"
      exit 1
    fi

    rsync -ravz dist/ $PREP_DIR/
    cd ..
  fi

  cd $PREP_DIR
  /usr/local/bin/composer install  --no-dev
else
  echo "Skip Build"
  cd $PREP_DIR
fi

echo "start upload"
# setup passwordless ssh
if [ ! -z $RESETSSH ]; then
    echo "Reset ssh key"
    ssh-keygen -f "/home/ray/.ssh/known_hosts" -R $FTP_HOST
    ssh-copy-id -f -i ~/.ssh/id_rsa -oHostKeyAlgorithms=+ssh-dss $FTP_USER@$FTP_HOST
else
    echo "Skip SSH Reset"
fi

rsync -rave  'ssh -oHostKeyAlgorithms=+ssh-dss' --delete . $FTP_USER@$FTP_HOST:$FTP_TARGETFOLDER
cd public
chmod 755 *.php
ssh  $FTP_USER@$FTP_HOST "chmod 755 $FTP_TARGETFOLDER\public"
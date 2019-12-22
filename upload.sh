#!/bin/bash

. ./env_vars.sh
PREP_DIR='../cal_track_prod'
mkdir $PREP_DIR

rsync -ravz  --exclude-from 'exclude-list.txt' --delete . $PREP_DIR
rsync -avz  _config/SERVER_CONFIG.php.prod $PREP_DIR/backend/SERVER_CONFIG.php
rsync -avz  .htaccess $PREP_DIR/

pushd .
cd $PREP_DIR
echo "Usage: " $0 " [option reset key]"
/usr/local/bin/composer install  --no-dev

echo "start upload"

# # setup passwordless ssh
if [ $# -eq 1 ]; then
    echo "Resetting SSH key"
    ssh-keygen -f "/home/ray/.ssh/known_hosts" -R $FTP_HOST
    ssh-copy-id -f -i ~/.ssh/id_rsa -oHostKeyAlgorithms=+ssh-dss $FTP_USER@$FTP_HOST
fi

rsync -rave  'ssh -oHostKeyAlgorithms=+ssh-dss' --delete . $FTP_USER@$FTP_HOST:$FTP_TARGETFOLDER 

popd
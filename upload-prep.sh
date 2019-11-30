#!/bin/bash
. ./upload.sh
PREP_DIR='../calendar_tracker_prod'
mkdir $PREP_DIR

rsync -ravz  --exclude-from 'exclude-list.txt' --delete . $PREP_DIR
rsync -avz  _config/prod/_mdb-config.php $PREP_DIR/backend/core/
rsync -avz  _config/.htaccess $PREP_DIR/

pushd .
cd $PREP_DIR

/usr/local/bin/composer install  --no-dev

echo "start upload"

# # setup passwordless ssh
ssh-keygen -f "/home/ray/.ssh/known_hosts" -R $HOST
ssh-copy-id -f -i ~/.ssh/id_rsa -oHostKeyAlgorithms=+ssh-dss $USER@$HOST

rsync -r -a -v -e  'ssh -oHostKeyAlgorithms=+ssh-dss' --delete $SOURCEFOLDER $USER@$HOST:$TARGETFOLDER 

popd
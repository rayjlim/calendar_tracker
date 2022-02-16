#!/bin/bash

app_name="tracks"
now=`date +"%Y-%m-%d"`
cd ..
zip $app_name-configs.$now.zip -@ < ./scripts/backup_files.txt

mv $app_name-configs.$now.zip ~/Documents

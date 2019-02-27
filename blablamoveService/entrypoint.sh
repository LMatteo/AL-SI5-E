#!/bin/bash
mysql -h$dbName -uuser -puser > /dev/null 2> /dev/null

res=$?
while [ ! $res -eq 0 ]; do
    echo 'Waiting to database to be up ... (code='$res')'
    sleep 2
    mysql -h$dbName -uuser -puser > /dev/null 2> /dev/null
    res=$?
done

npm start
#!/bin/bash

qIP=`docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' blablamove-test-queue`

res=curl -s -o /dev/null -I -w "%{http_code}" -u guest:guest http://$qIP:15672/api/overview

while [ ! $res -eq 200 ]; do
    echo 'Waiting to queue to be up ... (code='$res')'
    sleep 2
    res=curl -s -o /dev/null -I -w "%{http_code}" -u guest:guest http://$qIP:15672/api/overview
done
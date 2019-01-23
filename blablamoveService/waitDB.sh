#!/bin/bash

databseIP=`docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' blablamove-test-mysql`

mysql -e '\q' -h $databseIP > /dev/null 2> /dev/null

res=$?
while [ ! $res -eq 0 ]; do
    echo 'Waiting to database to be up ... (code='$res')'
    sleep 2
    mysql -e '\q' -h $databseIP > /dev/null 2> /dev/null
    res=$?
done
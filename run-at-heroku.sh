#!/usr/bin/env bash

set -e
set -x

cd ./web/src/main; npm install; bower install; cd -

cd ./api/src/main; npm install; cd -

http-server ./web/src/main &

node ./api/src/main/app start
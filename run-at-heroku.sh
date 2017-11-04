#!/usr/bin/env bash

set -e
set -x

cd ./api/src/main; npm install; cd -
cd ./web/src/main; npm install; bower install; cd -

node ./api/src/main/app start
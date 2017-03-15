# nodejs-ad

[![CircleCI](https://img.shields.io/circleci/project/github/romajs/nodejs-ad.svg)](https://circleci.com/gh/romajs/nodejs-ad)
[![Codecov](https://img.shields.io/codecov/c/github/romajs/nodejs-ad.svg)](https://codecov.io/gh/romajs/nodejs-ad)
[![dependencies](https://david-dm.org/romajs/nodejs-ad.svg)](https://david-dm.org/romajs/nodejs-ad)
[![devDependencies](https://david-dm.org/romajs/nodejs-ad/dev-status.svg)](https://david-dm.org/romajs/nodejs-ad?type=dev)

### Featuring

- nodejs and npm
- nodemon: development server w/ auto reload
- integrated testing w/ express app, mock-couch and supertest
- coutinuos integration w/ circle.ci
- code coverage w/ codecov
- body-parser: x-www-form-urlencoded and json
- compression/gzip

### To Do

- authentication
- readme shields
- debug
- couchdb auth
- couchdb fixtures
- couchdb dump and restore: https://github.com/danielebailo/couchdb-dump
- couchdb views
- couchdb migration
- express async/await
- cluster
- NODE_ENV
- multipart form/data

### Commands

npm install

npm test

./run-coverage.sh

./run-server.sh

./script/docker/couchdb/build.sh

./script/docker/couchdb/run.sh
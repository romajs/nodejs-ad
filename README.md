# nodejs-ad

[![CircleCI](https://img.shields.io/circleci/project/github/romajs/nodejs-ad.svg)](https://circleci.com/gh/romajs/nodejs-ad)
[![Codecov](https://img.shields.io/codecov/c/github/romajs/nodejs-ad.svg)](https://codecov.io/gh/romajs/nodejs-ad)
[![dependencies](https://david-dm.org/romajs/nodejs-ad.svg)](https://david-dm.org/romajs/nodejs-ad)
[![devDependencies](https://david-dm.org/romajs/nodejs-ad/dev-status.svg)](https://david-dm.org/romajs/nodejs-ad?type=dev)

### Featuring

- [x] couchdb
- [x] docker
- [x] express
- [x] nodejs
- [x] npm

Express:
- [ ] async/await
- [x] authentication (jwt)
- [x] body-parser (x-www-form-urlencoded and json)
- [x] compression/gzip
- [ ] cluster
- [ ] multipart form/data
- [ ] NODE_ENV

Couchdb:
- [ ] auth/admin
- [ ] backup and restore (https://github.com/danielebailo/couchdb-dump)
- [ ] fixture
- [ ] migration
- [x] nano
- [x] views

Integrated tests:
- [x] mocha
- [x] mock-couch
- [x] supertest (request)
- [ ] test fixture (faker)

Continuos Integration:
- [x] circle.ci

Code coverage:
- [x] codecov


Automatic server restart:
- [x] nodemon

Misc:
- [x] badges/shields
- [ ] debug
- [ ] eslint
- [ ] profiling (new relic or https://github.com/baryshev/look)

Automatic browser refresh
- [ ] livereload

### Commands

`npm install`

`npm test`

`./run-coverage.sh`

`./run-server.sh`

`./script/docker/couchdb/build.sh`

`./script/docker/couchdb/run.sh`

### Folder structure

```
.
├── coverage/
├── node_modules/
├── script/
│   ├── docker/
│   │   └── couchdb/
│   └── fixture/
├── src/
│   ├── api/
│   │   ├── middleware
│   │   ├── model
│   │   ├── resource
│   │   └── service
│   ├── app.js
│   ├── config.js
│   ├── server.js
│   └── web
└── test/
├── circle.yml
├── nodejs-ad.sublime-project
├── nodejs-ad.sublime-workspace
├── package.json
├── README.md
├── run-coverage.sh
├── run-server.sh
```
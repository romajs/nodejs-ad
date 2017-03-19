# nodejs-ad

[![CircleCI](https://img.shields.io/circleci/project/github/romajs/nodejs-ad.svg)](https://circleci.com/gh/romajs/nodejs-ad)
[![Codecov](https://img.shields.io/codecov/c/github/romajs/nodejs-ad.svg)](https://codecov.io/gh/romajs/nodejs-ad)
[![dependencies](https://david-dm.org/romajs/nodejs-ad.svg)](https://david-dm.org/romajs/nodejs-ad)
[![devDependencies](https://david-dm.org/romajs/nodejs-ad/dev-status.svg)](https://david-dm.org/romajs/nodejs-ad?type=dev)

[![code climate](https://codeclimate.com/github/romajs/nodejs-ad.png)](https://codeclimate.com/github/romajs/nodejs-ad)
[![issue count](https://codeclimate.com/github/romajs/nodejs-ad/badges/issue_count.svg)](https://codeclimate.com/github/romajs/nodejs-ad)

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
- [ ] express-validator
- [ ] multipart form/data
- [ ] NODE_ENV

Couchdb:
- [ ] auth/admin
- [ ] backup and restore (https://github.com/danielebailo/couchdb-dump)
- [ ] fixture
- [ ] migration (knex)
- [x] nano
- [x] views

Integrated tests:
- [x] mocha
- [x] mock-couch
- [x] supertest (request)
- [ ] test fixture (faker)

Debug:
- [x] node-debug (+nodemon --debug)

Continuos Integration:
- [x] circle.ci

Code coverage:
- [x] istanbul
- [x] codecov

Logging:
- [x] winston
- [x] express-winston
- [x] blocked

Lint:
- [x] ESLint
- [x] Code climate
- [ ] Standart

Automatic server restart:
- [x] nodemon

Misc:
- [x] badges/shields
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

### Preject structure

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
# nodejs-ad

[![CircleCI](https://img.shields.io/circleci/project/github/romajs/nodejs-ad.svg)](https://circleci.com/gh/romajs/nodejs-ad)
[![Codecov](https://img.shields.io/codecov/c/github/romajs/nodejs-ad.svg)](https://codecov.io/gh/romajs/nodejs-ad)
[![dependencies](https://david-dm.org/romajs/nodejs-ad.svg)](https://david-dm.org/romajs/nodejs-ad)
[![devDependencies](https://david-dm.org/romajs/nodejs-ad/dev-status.svg)](https://david-dm.org/romajs/nodejs-ad?type=dev)

<!-- [![code climate](https://codeclimate.com/github/romajs/nodejs-ad.png)](https://codeclimate.com/github/romajs/nodejs-ad) -->
<!-- [![issue count](https://codeclimate.com/github/romajs/nodejs-ad/badges/issue_count.svg)](https://codeclimate.com/github/romajs/nodejs-ad) -->

## Featuring

### Back-end

- [x] mondogb
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

MongoDB:
- [ ] auth/admin
- [ ] backup and restore
- [ ] fixture
- [ ] migration
- [x] mongoose
- [ ] views

Integrated tests:
- [ ] mongo mock
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

### Fron-end

- [x] angularjs
- [ ] aria/role
- [x] bootstrap
- [ ] browserify
- [ ] infinite scroll
- [ ] search
- [ ] user authentication

Forms:
- [x] Drag and drop file upload
- [x] Form validation
- [ ] Rich text (quill and ngQuill)

Dependency control
- [x] bower

Automatic browser refresh
- [ ] livereload

Routing
- [x] ui-router

Internationalization
- [ ] translate

Modules
- [ ] Auth
- [ ] Create ad
- [ ] View ad
- [ ] Edit ad
- [ ] List ads
- [ ] View user
- [ ] User ads
- [ ] Edit user
- [ ] Search ads
- [ ] History ad
- [ ] User history

### Commands

Install dependencies: `npm install`

Run tests: `npm test`

Run coverage: `npm run coverage`

Run lint: `npm run lint`

Run app server (express): `npm start`

Build docker image for MongoDB: `./script/docker/mongodb/build.sh`

Run docker container for MongoDB: `./script/docker/mongodb/run.sh`

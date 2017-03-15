var config = require('../../config.js')

var couch = require('nano')(config.couchdb.url())

module.exports = couch.use('user')
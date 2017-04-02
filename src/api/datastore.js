var config = require('../config.js')
var Datastore = require('@google-cloud/datastore')

module.exports = Datastore({
  projectId: config.gcloud.projectId,
})
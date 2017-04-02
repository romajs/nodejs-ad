var config = require('../config.js')
var Datastore = require('@google-cloud/datastore')
var winston = require('winston')

var datastore = Datastore({
  projectId: config.gcloud.projectId,
})

var logger = new (winston.Logger)(config.logger)

logger.info('@google-cloud/datastore loaded: ', [
	'defaultBaseUrl_=' + datastore.defaultBaseUrl_,
	'namespace=' + datastore.namespace,
	'projectId=' + datastore.projectId,
  'apiVersion=' + datastore.apiVersion,
  'baseUrl=' + datastore.baseUrl,
  'email=' + datastore.email,
  // 'globalInterceptors=' + datastore.globalInterceptors,
  // 'interceptors=' + datastore.interceptors,
  'maxRetries=' + datastore.maxRetries,
  'name=' + datastore.name,
  'projectIdRequired=' + datastore.projectIdRequired,
  'scope=' + datastore.scope,
  'scopes=' + datastore.scopes,
  'service=' + datastore.service,
  'spec=' + datastore.spec,
  'test=' + datastore.test,
  'type=' + datastore.type,
  'userAgent=' + datastore.userAgent,
  'version=' + datastore.version,
].join(', '))

module.exports = datastore
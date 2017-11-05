var config = rootRequire('config')
var logger = rootRequire('logger')
var redis = require('redis')
var RedisSMQ = require('rsmq')

var client = redis.createClient({
  host: 'redis',
  port: 6379
})

client.on('error', logger.error)

client.on('end', function () {
  logger.info('Redis/RedisSMQ is now ended')
})

client.on('connect', function () {
  logger.info('Redis/RedisSMQ connected successfully at:', client.connection_options)
})

client.on('reconnecting', function () {
  logger.info('Redis/RedisSMQ is now reconnecting')
})

// client.on('ready', function () {
//   logger.debug('Redis/RedisSMQ is now ready')
// })

// client.on('idle', function () {
//   logger.debug('Redis/RedisSMQ is now idle')
// })

client.on('warning', function (warning) {
  logger.warn('Redis/RedisSMQ received warning:', warning)
})

var rsmq = new RedisSMQ({
  client: client,
  ns: 'nodejs-ad'
})

// rsmq.createQueue({qname:'ad-new'}, function (err, resp) {
//   if(err) {
//     logger.error(err)
//   }
//   if (resp === 1) {
//     logger.info('Created queue:', 'ad-new')
//   }
// })

module.exports = rsmq
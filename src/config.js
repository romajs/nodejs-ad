var winston = require('winston')

function config (env, callback) {
  callback(configs[env] = baseConfig(env))
}

function baseConfig (name) {
  return {
    name: name || 'default',
    auth: {
      header_name: 'x-access-token',
      secret: 'JHVwM3JfJDNjcjM3Cg==',
      expiresIn: 86400 // expires in 24 hours
    },
    http: {
      host: '127.0.0.1',
      port: 8000
    },
    logger: {
      transports: [
        new winston.transports.Console({
          colorize: true,
          timestamp: true
        })
      ],
      level: 'info',
      exitOnError: false,
      expressFormat: true,
      colorize: true
    },
    mongodb: {
      host: 'localhost',
      port: 27017,
      protocol: 'mongodb',
      dbname: 'nodejs-ad',
      url: function () {
        return [this.protocol, '://', this.host, ':', this.port, '/', this.dbname].join('')
      }
    }
  }
}

var configs = {}

config('prod', function (config) {
  config.http.host = '0.0.0.0'
  config.http.port = 8000
  config.mongodb.dbname = 'heroku_zllb9zdl'
  config.mongodb.host = 'heroku_zllb9zdl:agookbgu046qfsmn8kaeu83hkd@ds227565.mlab.com'
  config.mongodb.port = 27565
})

config('dev', function (config) {
  config.http.host = '0.0.0.0'
  config.http.port = 8000
  config.mongodb.dbname = 'nodejs-ad'
  config.mongodb.host = 'mongodb'
  config.mongodb.port = 27017
})

config('test', function (config) {
  config.http.host = '127.0.0.1'
  config.http.port = 8001
  config.mongodb.dbname = 'nodejs-ad-test'
  config.mongodb.host = 'localhost'
  config.mongodb.port = 27017
})

var env = process.env.NODE_ENV || 'dev'

module.exports = configs[env]

var winston = require('winston')

function baseConfig (name) {
  return {
    name: name || 'default',
    auth: {
      header_name: 'x-access-token',
      secret: 'JHVwM3JfJDNjcjM3Cg==',
      expiresIn: 86400 // expires in 24 hours
    },
    cloudinary: {
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
      level: 'debug',
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

var profiles = {
  'production': function (config) {
    config.http.host = '0.0.0.0'
    config.http.port = process.env.PORT
    config.mongodb = {
      url: function() {
        return process.env.MONGODB_URI
      }
    }
  },
  'dev': function (config) {
    config.http.host = '0.0.0.0'
    config.http.port = 8000
    config.mongodb.dbname = 'nodejs-ad'
    config.mongodb.host = 'mongodb'
    config.mongodb.port = 27017
    config.cloudinary = {
      cloud_name : 'na',
      api_key : 'na',
      api_secret : 'na',
      upload_prefix: 'https://cloudinary:9443'
    }
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
  },
  'test': function (config) {
    config.http.host = '127.0.0.1'
    config.http.port = 8001
    config.mongodb.dbname = 'nodejs-ad-test'
    config.mongodb.host = 'localhost'
    config.mongodb.port = 27017
  }
}

var env = process.env.NODE_ENV || 'dev'

var config = baseConfig(env)
var profile = profiles[env]

profile(config)

module.exports = config

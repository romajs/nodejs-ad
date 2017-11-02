var blocked = require('blocked')
var bodyParser = require('body-parser')
var express = require('express')
var expressWinston = require('express-winston')
var fileType = require('file-type')
var formidable = require('formidable')
var fs = require('fs-extra')
var http = require('http')
var https = require('https')
var imageSize = require('image-size')
var randomstring = require("randomstring")
var winston = require('winston')

blocked(function (ms) {
  logger.warn('blocked for %sms', ms | 0)
})

var logger = new (winston.Logger)({
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
})

var HTTP_PORT = process.env.HTTP_PORT || 9080
var HTTPS_PORT = process.env.HTTPS_PORT || 9443

var UPLOAD_HOST = process.env.UPLOAD_HOST || 'http://0.0.0.0:' + HTTP_PORT
var UPLOAD_DIR = process.env.UPLOAD_DIR || '/upload'

var options = {
  key: fs.readFileSync('/ssl/key.pem'),
  cert: fs.readFileSync('/ssl/cert.pem'),
}

var app = express()

module.exports = {
  app, 
  start: function() {
    http.createServer(app).listen(HTTP_PORT, function() {
      logger.info('Http server listening on port %s...', HTTP_PORT)
    })
    https.createServer(options, app).listen(HTTPS_PORT, function() {
      logger.info('Https server listening on port %s...', HTTPS_PORT)
    })
  }
}

app.use(express.static(UPLOAD_DIR))

app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(bodyParser.json())

app.use(expressWinston.logger({
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
}))

app.post('/:api_version/:cloudname/image/upload', function (req, res, next) {

  var id = randomstring.generate(20)
  logger.debug('id:', id)

  var version = randomstring.generate({ length: 10, charset: 'numeric' })
  logger.debug('version:', version)

  var cloudname = req.params.cloudname
  logger.debug('cloudname:', cloudname)

  var uploadDir = [UPLOAD_DIR, cloudname, 'image/upload', 'v' + version].join('/')
  logger.debug('uploadDir: ', uploadDir)
  fs.ensureDirSync(uploadDir)

  var form = new formidable.IncomingForm()

  form.encoding = 'utf-8'
  form.hash = 'md5'
  form.keepExtensions = true
  form.maxFields = 1000
  form.maxFieldsSize = 1024 * 1024 * 2 // 2 MB
  form.multiples = false
  form.type = 'multipart'
  form.uploadDir = uploadDir

  form.on('progress', function (recv, total) {
    logger.debug('received: %s % (%s / %s bytes)', Number(recv / total * 100).toFixed(2), recv, total)
  })

  form.on('error', function (err) {
    next(err)
  })

  form.on('aborted', function (name, file) {
    logger.warn('aborted: name="%s", path="%s", type="%s", size=%s bytes', file.name, file.path, file.type, file.size)
    res.status(308).end()
  })

  form.parse(req, function (err, fields, files) {

    if (err) {
      return next(err)
    }

    var file = files.file
    logger.info('file: name="%s", path="%s", type="%s", size=%s bytes, hash="%s", lastModifiedDate="%s"',
      file.name, file.path, file.type, file.size, file.hash, file.lastModifiedDate)

    var fileTypeInfo = fileType(fs.readFileSync(file.path))
    logger.info('fileTypeInfo:', fileTypeInfo)

    var public_id = [id, fileTypeInfo.ext].join('.')

    imageSize(file.path, function (err, dimensions) {

      var newPath = [cloudname, 'image/upload', 'v' + version, public_id].join('/')
      fs.renameSync(file.path, [UPLOAD_DIR, newPath].join('/'))
      var url = [UPLOAD_HOST, newPath].join('/')

      var jsonResponse = {
        public_id: public_id,
        version: version,
        signature: randomstring.generate(40),
        width: dimensions.width,
        height: dimensions.height,
        format: fileTypeInfo.ext, 
        resource_type: fileTypeInfo.mime.split('/')[0],
        original_filename: file.path,
        url: url,
        secure_url: url,
        bytes: file.size,
        etag: file.hash,
        created_at: file.lastModifiedDate.toISOString(),
        placeholder: false,
        type: 'upload'
      }

      logger.info('jsonResponse: ', jsonResponse)

      return res.status(200).send(jsonResponse)

    })

  })

})

// app.all('*', function (req, res, next) {
//   return res.status(200).send()
// })

require('make-runnable')
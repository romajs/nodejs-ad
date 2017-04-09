var express = require('express')
var router = express.Router()
var formidable = require('formidable');

var UploadModel = require(process.env.src + '/api/model/uploadModel.js')

var Upload = UploadModel.Upload

router.post('/', function (req, res, next) {

	// TODO: winston logger

  var form = new formidable.IncomingForm()

  form.encoding = 'utf-8'
  form.keepExtensions = true
  form.type = 'multipart'
  form.maxFieldsSize = 1024 * 1
  form.maxFields = 10
  form.multiples = true
  form.uploadDir = './uploads'

  form.on('progress', function (recv, total) {
    console.log('#### received: (%s / %s bytes) %s %', recv, total, Number(recv / total * 100).toFixed(2))
	})

  form.on('error', function (err) {
		next(err)
  })

  form.on('aborted', function (name, file) {
    console.log('aborted ', arguments)
		res.status(308).end()
  })

  var uploadPromises = []

  form.on('file', function (name, file) {

    console.log('received file:', name, file.name, file.path, file.type, file.size)

    var upload = new Upload({
			name: file.name,
			path: file.path,
			type: file.type,
			size: file.size,
			user_id: req.auth.user._id,
		})

    uploadPromises.push(upload.save())

  })

  form.on('end', function (name, file) {

		Promise.all(uploadPromises).then(function(uploads) {
			return res.status(200).json(uploads)
		}).catch(function(err) {
			return next(err)
		})

  })

  form.parse(req)

})

module.exports = router
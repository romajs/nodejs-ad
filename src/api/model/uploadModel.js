var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function Enum(arr) {
	var obj = {}
	arr.forEach(function(e) { obj[e] = e })
	return obj
}

var UploadStatus = Enum([
	'TEMPORARY',
	'STEADY',
])

var UploadSchema = new Schema({
  name: String,
  path: String,
  type: String,
  size: Number,
  hash_md5: String,
  status: { type: String, enum: Object.keys(UploadStatus) },
  user_id: { type: Schema.ObjectId, ref: 'User' },
})

var Upload = mongoose.model('Upload', UploadSchema)

module.exports = {
	Upload,
	UploadSchema,
	UploadStatus,
}
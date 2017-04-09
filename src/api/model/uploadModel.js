var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UploadSchema = new Schema({
  name: String,
  path: String,
  type: String,
  size: Number,
})

var Upload = mongoose.model('Upload', UploadSchema)

module.exports = {
	Upload,
	UploadSchema,
}
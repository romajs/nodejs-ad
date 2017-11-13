var mongoose = require('mongoose')
var Schema = mongoose.Schema
var Enum = rootRequire('main/misc/util').Enum

var AttachmentStatus = new Enum('TEMPORARY', 'STEADY')

var AttachmentSchema = new Schema({
  name: String,
  type: String,
  size: Number,
  hash_md5: String,
  status: {
    type: String,
    enum: AttachmentStatus.items()
  },
  created_at: {
    type: Date
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  user_id: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  url: String,
  secure_url: String,
  cloudinary_id: String
})

var Attachment = mongoose.model('Attachment', AttachmentSchema)

module.exports = {
  Attachment,
  AttachmentSchema,
  AttachmentStatus
}

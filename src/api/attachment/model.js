var mongoose = require('mongoose')
var Schema = mongoose.Schema
var Enum = rootRequire('misc/util').Enum

var AttachmentStatus = new Enum('TEMPORARY', 'STEADY')

var AttachmentSchema = new Schema({
	name: String,
	path: String,
	type: String,
	size: Number,
	hash_md5: String,
	status: {
		type: String,
		enum: AttachmentStatus.items(),
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
})

var Attachment = mongoose.model('Attachment', AttachmentSchema)

module.exports = {
	Attachment,
	AttachmentSchema,
	AttachmentStatus,
}
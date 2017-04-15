var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdStatus = Enum([
	'PENDING',
	'APPROVED',
	'REPROVED',
	'BANNED',
	'EXPIRED'
	])

var AdSchema = new Schema({
	title: String,
	details: String,
	value: Number,
	status: { type: String, enum: Object.keys(AdStatus) },
	user_id: { type: Schema.ObjectId, ref: 'User' },
	attachment_ids: [{ type: Schema.ObjectId, ref: 'Attachment' }],
	created_at: { type: Date },
	updated_at: { type: Date, default: Date.now },
})

var Ad = mongoose.model('Ad', AdSchema)

module.exports = {
	Ad,
	AdSchema,
	AdStatus,
}
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	firebase_id: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now
	}
});

module.exports = mongoose.model('User', userSchema);

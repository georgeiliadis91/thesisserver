const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
	firebase_id: {
		type: String,
		required: true
	},
	quiz_id: {
		type: String,
		required: true,
		default: null
	},
	quiz_name: {
		type: String,
		required: true,
		default: null
	},
	bestScore: {
		type: Number,
		required: true,
		default: null
	},
	attempts: {
		type: Number,
		required: false,
		default: 2
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now
	}
});

module.exports = mongoose.model('Result', resultSchema);

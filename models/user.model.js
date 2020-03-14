const mongoose = require('mongoose')


const scoreSchema = new mongoose.Schema({
	quiz_id: {
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
	}
})

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
	scores: [scoreSchema],
	createdAt: {
		type: Date,
		required: true,
		default: Date.now
	}
})

module.exports = mongoose.model('User', userSchema)
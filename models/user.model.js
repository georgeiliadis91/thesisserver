const mongoose = require('mongoose')


const scoreSchema = new mongoose.Schema({
	id: {
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
		required: true,
		default: 3
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now
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
	score: [scoreSchema],
	createdAt: {
		type: Date,
		required: true,
		default: Date.now
	}
})

module.exports = mongoose.model('User', userSchema)
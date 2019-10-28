const mongoose = require('mongoose')

const quizSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now
	}
})

module.exports = mongoose.model('Quiz', quizSchema)
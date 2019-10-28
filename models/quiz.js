const mongoose = require('mongoose')



const questionSchema = new mongoose.Schema({
	questionTitle: {
		type: String,
		required: true,
		default: null
	},
	answerA: {
		type: String,
		required: true,
		default: null
	},
	answerB: {
		type: String,
		required: true,
		default: null
	},
	answerC: {
		type: String,
		required: true,
		default: null
	},
	answerD: {
		type: String,
		required: true,
		default: null
	},
	correctAnswer: {
		type: Number,
		required: true,
		default: null
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now
	}
})

const quizSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	questions: [questionSchema],
	createdAt: {
		type: Date,
		required: true,
		default: Date.now
	}
})

module.exports = mongoose.model('Quiz', quizSchema)
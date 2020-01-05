const express = require('express')
const router = express.Router()
const Quiz = require('../models/quiz.model')

// Getting all
router.get('/', async (req, res) => {
	try {
		const quizes = await Quiz.find()
		res.json(quizes)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

// Getting One
router.get('/:id', getQuiz, (req, res) => {
	res.json(res.quiz)
})

// Creating one
router.post('/', async (req, res) => {
	// let data = JSON.stringify(req.body)
	const quiz = new Quiz(req.body)

	try {
		const newQuiz = await quiz.save()
		res.status(201).json(newQuiz)
		// res.json(req.body)

	} catch (err) {
		res.status(400).json({ message: err.message })
	}
})

// Updating One
router.patch('/:id', getQuiz, async (req, res) => {
	if (req.body.name != null) {
		res.quiz.name = req.body.name
	}
	if (req.body.questions != null) {
		res.quiz.questions = req.body.questions
	}



	try {
		const updatedQuiz = await res.quiz.save()
		res.json(updatedQuiz)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
})

// Deleting One
router.delete('/:id', getQuiz, async (req, res) => {
	try {
		await res.quiz.remove()
		res.json({ message: 'Deleted Quiz' })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

async function getQuiz(req, res, next) {
	let quiz
	try {
		quiz = await Quiz.findById(req.params.id)
		if (quiz == null) {
			return res.status(404).json({ message: 'Cannot find quiz' })
		}
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}

	res.quiz = quiz
	next()
}

module.exports = router
const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz.model');
const User = require('../models/user.model');
const Result = require('../models/result.model');

// Getting all
router.get('/', async (req, res) => {
	try {
		const quizes = await Quiz.find();
		res.json(quizes);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Getting One
router.get('/:id', getQuiz, (req, res) => {
	res.json(res.quiz);
});

// Creating one
router.post('/', async (req, res) => {
	// let data = JSON.stringify(req.body)
	const quiz = new Quiz(req.body);

	try {
		const newQuiz = await quiz.save();
		res.status(201).json(newQuiz);
		// res.json(req.body)
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Updating One
router.patch('/:id', getQuiz, async (req, res) => {
	if (req.body.name != null) {
		res.quiz.name = req.body.name;
	}
	if (req.body.questions != null) {
		res.quiz.questions = req.body.questions;
	}

	try {
		const updatedQuiz = await res.quiz.save();
		res.json(updatedQuiz);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Deleting One
router.delete('/:id', getQuiz, async (req, res) => {
	try {
		await res.quiz.remove();
		res.json({ message: 'Deleted Quiz' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

//submitting quiz answers and calculating scores

router.post('/submit/:id', getQuiz, async (req, res) => {
	if (req.body != null) {
		console.log(req.body);
		try {
			var correct = 0;
			// console.log('===============');
			// console.log(res.quiz);

			// var answers = req.body;
			let { firebase_id, quiz_id, answers } = req.body;
			answers.forEach((answer, index) => {
				// console.log('index:' + index);
				// console.log('answer:' + answer);
				// console.log('correctAnswer:' + res.quiz.questions[index].correctAnswer);
				if (answer == res.quiz.questions[index].correctAnswer) {
					correct++;
				}
			});

			let score = (correct / res.quiz.questions.length).toFixed(2) * 100;

			user = await User.find({ firebase_id: firebase_id });
			console.log('user', user);
			quiz = await Quiz.find({ _id: quiz_id });
			console.log('quiz', quiz);

			result = await Result.find({
				quiz_id: quiz_id,
				firebase_id: firebase_id
			});
			console.log('result', result);
			console.log('123');

			if (user == null) {
				return res.status(404).json({ message: 'Cannot find user' });
			} else if (quiz == null) {
				console.log('456');
				return res.status(404).json({ message: 'Cannot find quiz' });
				console.log('789');
			} else if (result) {
				console.log('666');
				const result = await result.save();
			}

			// console.log(score);
			res.json({ message: 'You scored: ' + score + ' %' });
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	} else {
		res.status(500).json({ message: 'No data has submmited' });
	}
});

async function getQuiz(req, res, next) {
	let quiz;
	try {
		quiz = await Quiz.findById(req.params.id);
		if (quiz == null) {
			return res.status(404).json({ message: 'Cannot find quiz' });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}

	res.quiz = quiz;
	// console.log(res.quiz);
	next();
}

module.exports = router;

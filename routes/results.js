const express = require('express');
const router = express.Router();
const Result = require('../models/result.model');
const User = require('../models/user.model');

//Return total score for each user.
router.get('/rankings/', async (req, res) => {
	try {
		let userData = [];
		const users = await User.find();

		for (let index = 0; index < users.length; index++) {
			const results = await Result.find({
				firebase_id: users[index].firebase_id
			});

			let total = 0;
			results.forEach(result => {
				total = total + result.bestScore;
			});
			const average = total / results.length;

			await userData.push({
				name: users[index].name,
				firebase_id: users[index].firebase_id,
				total: total,
				average: average
			});
		}

		return res.json(userData);
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

// Getting all
router.get('/', async (req, res) => {
	try {
		const results = await Result.find();
		return res.json(results);
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

// Getting One
router.get('/:id', getResult, (req, res) => {
	return res.json(res.result);
});

router.delete('/:id', getResult, async (req, res) => {
	try {
		await res.result.remove();
		return res.json({ message: 'Deleted Result' });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

//get results given user id sum score.

router.get('/totalscore/:fid', async (req, res) => {
	try {
		const results = await Result.find({ firebase_id: req.params.fid });
		let total = 0;
		results.forEach(result => {
			total = total + result.bestScore;
		});
		const average = total / results.length;

		return res.json({ totalScore: total, average: average });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

//get individual results for scores of user

router.get('/allscores/:fid', async (req, res) => {
	try {
		const results = await Result.find({ firebase_id: req.params.fid });

		return res.json(results);
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

async function getResult(req, res, next) {
	let result;
	try {
		result = await Result.findById(req.params.id);
		if (result == null) {
			return res.status(404).json({ message: 'Cannot find result' });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}

	res.result = result;
	next();
}

module.exports = router;

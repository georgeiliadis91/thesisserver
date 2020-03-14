const express = require('express');
const router = express.Router();
const Result = require('../models/result.model');

// Getting all
router.get('/', async (req, res) => {
	try {
		const results = await Result.find();
		res.json(results);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Getting One
router.get('/:id', getResult, (req, res) => {
	res.json(res.result);
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

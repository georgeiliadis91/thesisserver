const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

// Getting all
router.get('/', async (req, res) => {
	try {
		const users = await User.find();
		return res.json(users);
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

// Creating one
router.post('/', async (req, res) => {
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		firebase_id: req.body.firebase_id
	});

	try {
		const newUser = await user.save();
		return res.status(201).json(newUser);
	} catch (err) {
		return res.status(400).json({ message: err.message });
	}
});

// Getting One
router.get('/:id', getUser, (req, res) => {
	return res.json(res.user);
});

// Updating One
router.patch('/:id', getUser, async (req, res) => {
	if (req.body.name != null) {
		res.user.name = req.body.name;
	}
	if (req.body.email != null) {
		res.user.email = req.body.email;
	}
	if (req.body.score != null) {
		res.user.score = req.body.score;
	}
	try {
		const updatedUser = await res.user.save();
		return res.json(updatedUser);
	} catch (err) {
		return res.status(400).json({ message: err.message });
	}
});

// Deleting One
router.delete('/:id', getUser, async (req, res) => {
	try {
		await res.user.remove();
		return res.json({ message: 'Deleted User' });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

async function getUser(req, res, next) {
	let user;
	try {
		user = await User.findById(req.params.id);
		if (user == null || user.length == 0) {
			return res.status(404).json({ message: 'Cannot find user' });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}

	res.user = user;
	next();
}

module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../model/User');
const auth = require('../middlewares/auth-middleware');
const AuthController = require('../controllers/auth.controllers');

router.post('/google', AuthController.signUp);

router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		res.json(user);
	} catch (err) {
		console.error(err.message);
	}
});

module.exports = router;

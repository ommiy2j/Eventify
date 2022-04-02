const express = require('express');
const router = express.Router();
const Server = require('../model/Server');
const auth = require('../middlewares/auth-middleware');
const { generate } = require('../utils/random_generator');
const User = require('../model/User');

//creating a server
router.post('/create', auth, async (req, res) => {
	try {
		const { serverName } = req.body;
		console.log(req);
		const admin = req.user.id;
		const reference_id = generate();

		const server = new Server({ serverName, admin, reference_id });
		server.members.unshift(admin);
		const user = await User.findById(admin);

		await server.save();

		user.serverAdmin.unshift(server.id);

		await user.save();
		res.status(201).send(server);
	} catch (err) {
		console.log(err);
		res.status(500).send('Server Error');
	}
});

router.post('/join', auth, async (req, res) => {
	try {
		const { reference_id } = req.body;
		let server = await Server.findOne({ reference_id });
		if (!server) {
			res.status(404).json({ message: 'server not found' });
		} else {
			const isMember = server.members.find((member) => member._id.toString() === req.user.id);
			if (isMember || server.admin === req.user.id) {
				res.json({ message: 'already a member' });
			} else {
				server.members.unshift(req.user.id);
				await server.save();
				const user = await User.findById(req.user.id);
				user.serverMember.unshift(server.id);
				await user.save();
				res.status(201).send(server);
			}
		}
	} catch (err) {
		console.log(err);
	}
});

//get servers for current user
router.get('/servers', auth, async (req, res) => {
	try {
		const curruser = req.user.id;

		const servers = await Server.find({
			members: { $elemMatch: { _id: curruser } }
		});

		res.json(servers);
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;

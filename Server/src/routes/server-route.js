const express = require('express');
const router = express.Router();
const Server = require('../model/Server');
const auth = require('../middlewares/auth-middleware');
const { generate } = require('../utils/random_generator');
const User = require('../model/User');

//creating a server
router.post('/create', auth, async (req, res) => {
	try {
		const { serverName, eventStartDate, eventEndDate } = req.body;
		let image = req.file.path;
		const admin = req.user.id;
		image = '/' + req.file.path.replace('\\', '/');

		const reference_id = generate();

		const server = new Server({ serverName, admin, reference_id, image, eventStartDate, eventEndDate });
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

router.post('/join', auth, (req, res) => {
	const { reference_id } = req.body;
	let mem;
	let id;
	userId = req.user.id;

	Server.findOne({ reference_id })
		.then((server) => {
			if (!server) {
				res.status(404).json({ message: 'server not found' });
			} else {
				mem = server.members;
				id = server._id;
			}
			for (var i = 0; i < mem.length; i++) {
				if (mem[i]._id == userId) {
					return res.json({ messege: 'already a member' });
				}
			}
			mem.unshift(req.user.id);
			Server.findByIdAndUpdate(id, { members: mem });
			return res.json({ messege: ' successfully joined' });
		})
		.catch((err) => {
			console.log(err);
		});
});

// router.post('/join', auth, async (req, res) => {
// 	try {
// 		const { reference_id } = req.body;
// 		console.log(reference_id);
// 		let server = await Server.findOne({ reference_id });
// 		if (!server) {
// 			res.status(404).json({ message: 'server not found' });
// 		} else {
// 			const isMember = server.members.find((member) => member._id.toString() === req.user.id);
// 			if (isMember || server.admin === req.user.id) {
// 				res.json({ message: 'already a member' });
// 			} else {
// 				await server.members.insertOne(req.user.id);
// 				// await server.save();
// 				const user = await User.findById(req.user.id);
// 				await user.serverMember.insertOne(server.id);
// 				// await user.save();
// 				res.status(201).send(server);
// 			}
// 		}
// 	} catch (err) {
// 		console.log(err);
// 	}
// });

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

router.get('/allservers', auth, (req, res) => {
	const currentPage = req.query.page || 1;
	const perPage = 3;
	let total = 0;
	Server.find()
		.countDocuments()
		.then((count) => {
			total = count;
			return Server.find().skip((currentPage - 1) * perPage).limit(perPage);
		})
		.then((result) => {
			res.status(200).json({
				result: result,
				total: Math.ceil(total / perPage)
			});
		})
		.catch((err) => {
			console.log(err);
		});
});

module.exports = router;

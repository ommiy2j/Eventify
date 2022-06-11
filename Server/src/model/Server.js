const mongoose = require('mongoose');

const ServerSchema = new mongoose.Schema({
	admin: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
	},
	serverName: {
		type: String,
		required: true
	},
	reference_id: {
		type: String,
		required: true,
		unique: true
	},
	image: {
		type: String
	},
	fromDate: {
		type: Date,
		required: true
	},
	toDate: {
		type: Date,
		required: true
	},
	members: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User'
			}
		}
	],
	rooms: [
        {
            roomName: {
                type: String,
            },
            roomId: {
                type: String,
            },
        },
    ],
});

const Server = mongoose.model('Server', ServerSchema);

module.exports = Server;

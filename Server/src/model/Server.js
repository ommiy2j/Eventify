const mongoose = require('mongoose');

const ServerSchema = new mongoose.Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    serverName: {
        type: String,
        required: true,
    },
    reference_id: {
        type: String,
        required: true,
        unique: true,
    },
    members: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        },
    ],
    conversations: [
        {
            conversation: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Conversation',
            },
        },
    ],
});

const Server = mongoose.model('Server', ServerSchema);

module.exports = Server;

const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        members: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Conversation = mongoose.model('Conversation', ConversationSchema);

module.exports = Conversation;

const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },
    picture: {
        type: String,
        required: true,
    },
    serverAdmin: [
        {
            server: {
                type: Schema.Types.ObjectId,
                ref: 'server',
            },
        },
    ],
    serverMember: [
        {
            server: {
                type: Schema.Types.ObjectId,
                ref: 'server',
            },
        },
    ],
    createdAt: {
        type: String,
        default: Date.now(),
        select: false,
    },
});

const User = model('User', userSchema);

module.exports = User;

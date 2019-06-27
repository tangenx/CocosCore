const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    vkId: Number,
    nickname: String,
    balance: {
        type: Number,
        default: 5000
    },
    gamemode: {
        type: Boolean,
        default: false
    },
    lastMessage: {
        type: Number,
        default: 0
    },
    permission: {
        type: Number,
        default: 0
    },
    mention: {
        type: Boolean,
        default: true
    },
    regDate: String
});

const User = model('User', userSchema);

module.exports = User;

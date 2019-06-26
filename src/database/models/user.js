const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    VKId: Number,
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

const User = mongoose.model('User', userSchema);

module.exports = User;
const userSchema = {
    vkId: Number,
    nickname: String,
    ban: {
        type: Boolean,
        default: false
    },
    balance: {
        type: Number,
        default: 5000
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
};

module.exports = userSchema;

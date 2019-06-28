const mongoose = require('mongoose');
const Chat = require('./models/chat');
const User = require('./models/user');

const Utils = require('../utils');

class DBManager {
    constructor(url) {
        this.url = url;
        this.Chat = Chat;
        this.User = User;
    }

    get [Symbol.toStringTag]() {
        return 'CocosCoreDB';
    }

    async connect() {
        await mongoose.connect(this.url, { useNewUrlParser: true });
    }

    async getUser(senderId, bot) {
        let user = await this.User.findOne({ vkId: senderId });

        if (!user) {
            const [profile] = await bot.vk.api.users.get({
                user_ids: senderId
            });

            user = new this.User({
                vkId: senderId,
                nickname: profile.first_name,
                regDate: Utils.getDateString()
            });

            await user.save();
        }

        return user;
    }

    async getChat(chatId) {
        let chat = await this.Chat.findOne({ id: chatId });
        if (!chat) {
            chat = new this.Chat({
                id: chatId
            });

            await chat.save();
        }

        return chat;
    }
}

module.exports = DBManager;

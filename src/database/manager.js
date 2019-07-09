const mongoose = require('mongoose');
const chatSchema = require('./defaultModels/chat');
const userSchema = require('./defaultModels/user');

const DatabaseError = require('../errors/databaseError');
const Utils = require('../utils');

const defaultNameModels = {
    USER: 'user',
    CHAT: 'chat'
};

class DBManager {
    models = {};

    constructor(uri) {
        this.connection = mongoose.createConnection(uri, { useNewUrlParser: true });

        this.setModel('user', userSchema);
        this.setModel('chat', chatSchema);
    }

    get [Symbol.toStringTag]() {
        return 'CocosCoreDB';
    }

    setModel(rawName, rawSchema) {
        const name = String(rawName).toLowerCase();

        if (name === defaultNameModels.USER) {
            if (!('nickname' in rawSchema)) {
                throw new DatabaseError('Не указано поле nickname в схеме user');
            }

            if (!('vkId' in rawSchema)) {
                throw new DatabaseError('Не указано поле vkId в схеме user');
            }

            if (!('ban' in rawSchema)) {
                throw new DatabaseError('Не указано поле ban в схеме user');
            }
        } else if (name === defaultNameModels.CHAT) {
            if (!('id' in rawSchema)) {
                throw new DatabaseError('Не указано поле id в схеме chat');
            }
        }

        const schema = new mongoose.Schema(rawSchema);

        const model = this.connection.model(name, schema);

        this.models[name] = model;

        return model;
    }

    getModel(rawName) {
        const name = rawName.toLowerCase();
        const model = this.models[name];

        if (!model) {
            throw new DatabaseError(`Модели ${name} не существует`);
        }

        return model;
    }

    async getUser(senderId, bot) {
        let user = await this.models.user.findOne({ vkId: senderId });

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

    async getChat(id) {
        let chat = await this.models.chat.findOne({ id: id });
        if (!chat) {
            chat = new this.Chat({
                id: id
            });

            await chat.save();
        }

        return chat;
    }
}

module.exports = DBManager;

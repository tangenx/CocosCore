const { Schema, model } = require('mongoose');

const chatSchema = new Schema({
    id: Number
});

const Chat = model('Chat', chatSchema);

module.exports = Chat;

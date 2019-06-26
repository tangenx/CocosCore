const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    id: Number 
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
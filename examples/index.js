const { CocosCoreBot } = require('../index');

const bot = new CocosCoreBot({
    token: process.env.TOKEN,
    aliases: ['бот', 'bot'],
    commandsDirectory: '../examples',
    logsDirectory: './logs',
    chatBot: true,
    mongoURI: process.env.MONGOURI
});

bot.db.setModel('user', {
    vkId: Number,
    nickname: String,
    ban: {
        type: Boolean,
        default: false
    },
    mention: {
        type: Boolean,
        default: true
    },
    regDate: String
});

bot.start().catch(bot.logger.error);

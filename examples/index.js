const { CocosCoreBot } = require('../index');

const bot = new CocosCoreBot({
    token: process.env.TOKEN,
    aliases: ['бот', 'bot'],
    commandsDirectory: '../examples',
    logsDirectory: './logs',
    chatBot: true,
    mongoURI: process.env.MONGOURI
});

bot.start().catch(bot.logger.error);

const { CocosCoreBot } = require('../index');

const bot = new CocosCoreBot({
    token: process.env.TOKEN,
    aliases: ['тост'],
    commandsDirectory: '../examples',
    logsDirectory: './logs',
    chatBot: true
});

bot.configure();
bot.connectMongoDB(process.env.MONGOURI);
bot.startListener();

const { CocosCoreBot } = require('../index');

const bot = new CocosCoreBot({
    token: 'f49b4ba420634f0bbe559c44c95ea8d863beb1c0c7bd47bba43e8c3910c0ba0c56b1d69c2823c81f5d47d', //process.env.TOKEN
    aliases: ['тост'],
    commandsDirectory: '../examples',
    logsDirectory: './logs',
    chatBot: true
});

bot.configure();
//bot.connectMongoDB(process.env.MONGOURI);
bot.startListener();

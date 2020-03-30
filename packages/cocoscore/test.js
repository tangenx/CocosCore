
/* for (let i = 30; i < 37; i++) {
    console.log(`${i}: \x1b[${i}mtest\x1b[0m`)
    
} */

const { CocosCore, Config } = require('./');
const config = new Config({
    commandsDirectory: './commands',
    token: 'e6a9c42eca0e0a46c433bb857c8777ba24389e61adaa49db940e85f0739cbd292cdb48ee9c49f858a7b0b',
    chatBot: true,
    apiType: 'longpoll'
});

const bot = new CocosCore(config);

bot.start().catch(console.error);
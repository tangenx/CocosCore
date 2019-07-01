<p align="center"><img src="./docs/CocosCoreLogo.svg?sanitize=true"></p>
<p align="center">
<img alt="npm" src="https://img.shields.io/npm/v/cocoscore.svg?style=flat-square">
<img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/cocoscore.svg?style=flat-square">
<img alt="npm" src="https://img.shields.io/npm/dt/cocoscore.svg?style=flat-square">
</p>

🥥 CocosCore - мощное и быстрое ядро для ботов [VK](https://vk.com), написанное на [Node.js](https://nodejs.org) и значительно упрощающее разработку ботов

| 📚 [Документация](docs/) | 📝 [Примеры](examples/) | 💭 [Беседа](https://vk.me/join/AJQ1d4dN0RFEYPzLYxLby4WK) |
| ------------------------ | ----------------------- | -------------------------------------------------------- |

## Установка

> npm i cocoscore

## Использование

```js
const { CocosCoreBot, Command } = require('cocoscore');

const bot = new CocosCoreBot({
    token: process.env.TOKEN,
    aliases: ['бот', 'bot'],
    commandsDirectory: './commands',
    logsDirectory: './logs',
    chatBot: true,
    mongoURI: process.env.MONGOURI
});

bot.start().catch(bot.logger.error);
```

## Пример простейшей команды

```js
const { Command } = require('cocoscore');

module.exports = new Command({
    trigger: /^тест$/i,
    name: 'тест',
    description: 'проверка работоспособности',
    emoji: '📡',
    handler(ctx) {
        ctx.send('Я в порядке!');
    }
})
```

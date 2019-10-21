const { Command } = require('../index');

module.exports = new Command({
    trigger: /^тест(?:\s+(.*)|$)/i,
    name: 'тест',
    description: '0 уровень вложенности',
    async handler(ctx) {
        ctx.send('Поехали!');
    },
    commands: [
        new Command({
            trigger: /^тост(?:\s+(.*)|$)/i,
            name: 'тост',
            description: '1 уровень вложенности',
            async handler(ctx) {
                ctx.send('Поверь, этот путь будет долгим...');
            },
            commands: [
                new Command({
                    trigger: /^туст(?:\s+(.*)|$)/i,
                    name: 'туст',
                    description: '2 уровень вложенности',
                    async handler(ctx) {
                        ctx.send('Ты можешь остановиться в любой момент, прекратив поиск совпадений в триггере');
                    },
                    commands: [
                        new Command({
                            trigger: /^тыст$/i,
                            name: 'тыст',
                            description: '3 уровень вложенности',
                            async handler(ctx) {
                                ctx.send('Приехали! Но знай, ты всегда можешь продолжить свой путь');
                            }
                        })
                    ]
                })
            ]
        })
    ]
});
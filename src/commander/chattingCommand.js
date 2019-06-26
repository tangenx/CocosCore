const Command = require('./command');
const request = require('../plugins/request');

module.exports = new Command({
    trigger: /^[^]+$/i,
    async handler(ctx, bot) {        
        /* let data = await request('http://isinkin-bot-api.herokuapp.com/1/talk', {
            method: 'POST',
            form: {
                q: !ctx.text ? '1337' : ctx.text,
                adminname: '',
                adminfname: '',
                adminlname: '',
                botname: bot.aliases.length > 0 ? bot.aliases[0] : 'бот',
                botfname: '',
                botlname: '',
                username: ctx.user ? ctx.user.nickname : '%username%',
                usersurname: '',
                adminvklink: 'https://vk.com/tgx_indexof'
            },
            json: true
        }); */

        let data = await request('https://xu.su/api/send', {
            method: 'POST',
            form: {
                bot: 'main',
                text: ctx.text,
                uid: '833feef7-4a56-4650-b770-7cd5b7868342'
            },
            json: true
        });        
        ctx.send(data.text);
    }
});
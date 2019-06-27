const { Command } = require('../../../../..');

module.exports = new Command({
    trigger: /^lol$/i,
    handler(ctx) {
        ctx.send('haha');
    }
});

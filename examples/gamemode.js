const { Command } = require('../');

module.exports = new Command({
    trigger: /^гм$/i,
    name: 'гм',
    description: 'включить/отключить игровой режим',
    emoji: '🕹',
    handler(ctx, bot) {
        if (!bot.gamemodeUsers) return;

        bot.gamemodeUsers.set(ctx.senderId, !ctx.gamemodeUser);
        
        ctx.gamemodeUser = bot.gamemodeUsers.get(ctx.senderId);

        ctx.send(`игровой режим ${ctx.gamemodeUser ? 'включён' : 'отключён'}.`, {
            emoji: '🕹'
        });
    }
});

const { Command } = require('../index');

module.exports = new Command({
    trigger: /^пом[ао]щь?$/i,
    name: 'помощь',
    description: 'список команд бота',
    emoji: '📜',
    handler(ctx, bot) {
        /* const commands = bot.commander.commands
            .filter((command) => command.name)
            .map((command) => `${command.emoji} ${command.name} -- ${command.description}`)
            .join('\n');

        ctx.send(`Список команд бота:\n\n${commands}`, {
            emoji: '📜'
        }); */

        const commands = bot.commander.commands
            .filter(command => command.name);

        const tab = '&#12288;';

        let message = 'Список команд бота:\n\n';
        let tabs;

        function searchSubCommands(command, tabs) {
            const subCommands = command.commands
                .filter(command => command.name);

            if (!subCommands.length) {
                return;
            }

            for (const subCommand of command.commands) {
                message += `${tab.repeat(tabs)}${subCommand.emoji} ${subCommand.name} -- ${subCommand.description}\n`;

                if (subCommand.commands.length) {
                    searchSubCommands(subCommand, tabs += 1);
                }
            }
        }

        for (const command of commands) {
            tabs = 1;
            message += `${command.emoji} ${command.name} -- ${command.description}\n`;

            if (command.commands.length) {
                searchSubCommands(command, tabs);
            }
        }

        ctx.send(message, {
            emoji: '📜'
        });
    }
});

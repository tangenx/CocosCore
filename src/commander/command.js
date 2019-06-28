const ConfigureError = require('../errors/configureError');

class Command {
    constructor({
        trigger,
        name = '',
        description = '',
        handler,
        emoji = '📔',
        commands = [],
        permission = 0
    }) {
        if (!trigger) throw new ConfigureError('Не указан триггер команды');

        this.trigger = trigger;
        this.name = name;
        this.description = description;

        if (!handler) throw new ConfigureError('Не указан обработчик команды');
        if (typeof handler !== 'function') throw new ConfigureError('Обработчик команды не является функцией');

        this.handler = handler;
        this.emoji = emoji;
        this.commands = commands;
        this.permission = permission;
    }

    get [Symbol.toStringTag]() {
        return 'Command';
    }

    searchSubCommand(context) {
        if (!this.commands.length) return this;

        let command;

        for (const subCommand of this.commands) {
            if (subCommand.trigger.test(context.text)) command = subCommand;
        }

        if (!command) return this;

        return command;
    }
}

module.exports = Command;

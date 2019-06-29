const fs = require('fs');
const glob = require('glob');
const { promisify } = require('util');
const ConfigureError = require('../errors/configureError');

const findFiles = promisify(glob);

class Commander {
    constructor() {
        this.commands = [];
    }

    async loadCommands(dir) {
        const absolutePath = await fs.promises.realpath(dir);
        const filePaths = await findFiles(`${absolutePath}/**/*.js`);

        for (const filePath of filePaths) {
            let file = require(filePath);

            if (Object.keys(file).length === 0) continue;

            if (!Array.isArray(file)) file = [file];

            for (const element of file) {
                if (element[Symbol.toStringTag] !== 'Command') throw new ConfigureError(`Экспортируемые данные в файле ${filePath} не являются командой`);
                this.commands.push(element);
            }
        }
    }

    findCommand(context) {
        let foundCommand;

        for (const command of this.commands) {
            if (command.trigger.test(context.text)) foundCommand = command;
        }

        if (!foundCommand) return null;

        let command = foundCommand.searchSubCommand(context);

        context.body = context.text.match(command.trigger);

        return command;
    }
}

module.exports = Commander;

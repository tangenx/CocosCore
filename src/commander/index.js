const fs = require('fs');
const glob = require('glob');
const { promisify } = require('util');
const ConfigureError = require('../errors/configureError');
const Command = require('./command');

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
                if (!(element instanceof Command)) throw new ConfigureError(`Экспортируемые данные в файле ${filePath} не являются командой`);
                this.commands.push(element);
            }
        }
    }

    find(context) {
        let foundCommand;

        for (const command of this.commands) {
            if (command.trigger.test(context.text)) foundCommand = command;
        }

        if (!foundCommand) return null;

        context.body = context.text.match(foundCommand.trigger);

        let command = foundCommand.searchSubCommand(context);

        return command;
    }
}

module.exports = Commander;

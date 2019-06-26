const fs = require('fs');
const ConfigureError = require('../errors/configureError')

class Commander {
    constructor() {
        this.commands = [];
    };

    async loadCommands(dir) {
        const path = await fs.promises.realpath(dir);
        const files = await fs.promises.readdir(dir);

        let foundFiles = files.filter(x => x.endsWith('.js'))
        
        for (const file of foundFiles) {
            const requiredFile = require(`${path}/${file}`);

            if (Object.keys(requiredFile).length === 0) continue;
            
            if (Array.isArray(requiredFile)) {
                for (const element of requiredFile) {
                    if (element[Symbol.toStringTag] !== 'Command') throw new ConfigureError(`Эскпортируемые данные в файле ${file} не являются командой`);
                    this.commands.push(element);
                };
            } else {
                if (requiredFile[Symbol.toStringTag] !== 'Command') throw new ConfigureError(`Эскпортируемые данные в файле ${file} не являются командой`);
                this.commands.push(requiredFile);
            }
        };

        if (~files.findIndex(x => !x.endsWith('.js'))) {
            let foundFolders = files.filter(x => !x.endsWith('.js'));
            await Promise.all(foundFolders.map(async (folder) => {
                await this.loadCommands(`${dir}/${folder}`);
            }));
        };
    };

    findCommand(context) {
        let foundCommand;
        for (const command of this.commands) {
            if (command.trigger.test(context.text)) foundCommand = command;
        };

        if (!foundCommand) return null;

        let command = foundCommand.searchSubCommand(context);

        context.body = context.text.match(command.trigger);

        return command;
    };
};

module.exports = Commander;
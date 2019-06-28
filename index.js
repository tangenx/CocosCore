const { VK } = require('vk-io');
const Logger = require('./src/plugins/logger');
const ConfigureError = require('./src/errors/configureError');
const Utils = require('./src/utils/index');

const Commander = require('./src/commander/commander');
const Command = require('./src/commander/command');

const DBManager = require('./src/database/manager');
const messageHandler = require('./src/messages/messageHandler');

class CocosCoreBot {
    constructor({
        token = null,
        groupId = null,
        developerId = null,
        aliases = [],
        aliasesFromStart = true,
        chatBot = false,
        apiMode = 'sequential',
        apiLimit = 20,
        logsDirectory = null,
        commandsDirectory = null
    }) {
        this.token = token;
        this.groupId = groupId;
        this.developerId = developerId;
        this.aliases = aliases;
        this.aliasesFromStart = aliasesFromStart;
        this.chatBot = chatBot;
        this.apiMode = apiMode;
        this.apiLimit = apiLimit;
        this.logsDir = logsDirectory;
        this.commandsDir = commandsDirectory;
        this.logger = new Logger(!this.logsDir ? null : `${this.logsDir}/${Utils.getDateString()}.txt`);
    }

    get [Symbol.toStringTag]() {
        return 'CocosCoreBot';
    }

    async configure() {
        if (!this.token) throw new ConfigureError('Не указан токен бота');
        this.vk = new VK({
            apiLimit: this.apiLimit,
            apiMode: this.apiMode,
            token: this.token
        });

        await this.vk.updates.start();

        if (!this.groupId) this.groupId = this.vk.options.pollingGroupId;
        if (this.groupId < 0) this.groupId = -this.groupId;
        if (this.vk.options.pollingGroupId !== this.groupId) this.groupId = this.vk.options.pollingGroupId;

        if (!this.commandsDir) throw new ConfigureError('Не указана директория команд');
        this.commander = new Commander();
        await this.commander.loadCommands(this.commandsDir);

        if (!Array.isArray(this.aliases)) {
            this.aliases = this.aliases.split(/,\s*/);
        }        

        if (this.aliases.length > 0) this.gamemodeUsers = new Map();

        this.trigger = new RegExp(`${this.aliasesFromStart ? '^' : ''}(?:\\[club${this.groupId}\\|(?:.*)\\]${this.aliases.length === 0 ? '' : `|${this.aliases.join('|')}`})[\\s,]*`, 'i');

        this.logger.ok('Сконфигурировано.');
    }

    async connectMongoDB(url) {
        if (!url) throw new ReferenceError('Не указан URL к базе данных');
        if (typeof url !== 'string') throw new TypeError('URL должен быть строкой');

        this.db = new DBManager(url);
        await this.db.connect();

        this.logger.ok('База данных подключена.');
    }

    startListener() {
        this.vk.updates.on(['new_message'], async (context) => {
            await messageHandler(context, this);
        });

        this.logger.ok('Бот на ядре СocosСore успешно запущен.');
    }
}

module.exports = { CocosCoreBot, Command, Utils };

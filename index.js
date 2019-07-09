const { VK } = require('vk-io');
const Logger = require('./src/plugins/logger');
const ConfigureError = require('./src/errors/configureError');
const Utils = require('./src/utils/index');

const Commander = require('./src/commander');
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
        commandsDirectory = null,
        mongoURI = null
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
        this.mongoURI = mongoURI;

        this.logger = new Logger(!this.logsDir ? null : `${this.logsDir}/${Utils.getDateString()} ${Utils.getTimeString()}.txt`);
    }

    get [Symbol.toStringTag]() {
        return 'CocosCoreBot';
    }

    async configure() {
        if (this.isConfigured) return this.logger.warn('Бот уже сконфигурирован');

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

        this.trigger = new RegExp(`${this.aliasesFromStart ? '^' : ''}(?:\\[club${this.groupId}\\|(?:.*)\\]${this.aliases.length === 0 ? '' : `|${this.aliases.join('|')}`})\\s*,?(\\s+|$)`, 'i');

        this.isConfigured = true;
        this.logger.ok('Сконфигурировано.');
    }

    async connectMongoDB(url) {
        if (this.isMongoConnected) return this.logger.warn('MongoDB уже подключена');

        if (!url && !this.mongoURI) throw new ReferenceError('Не указан URL к базе данных');
        if (!this.mongoURI) this.mongoURI = url;
        if (typeof this.mongoURI !== 'string') throw new TypeError('URL должен быть строкой');

        this.db = new DBManager(this.mongoURI);

        this.isMongoConnected = true;
        this.logger.ok('База данных подключена.');
    }

    startListener() {
        if (this.isStarted) return this.logger.warn('Бот уже запущен');

        this.vk.updates.on(['new_message'], async (context) => {
            await messageHandler(context, this);
        });

        this.isStarted = true;
        this.logger.ok('Бот на ядре СocosСore успешно запущен.');
    }

    async start() {
        if (!this.isConfigured) await this.configure();

        if (this.mongoURI && !this.isMongoConnected) await this.connectMongoDB();

        if (!this.isStarted) this.startListener();
    }
}

module.exports = { CocosCoreBot, Command, Utils };

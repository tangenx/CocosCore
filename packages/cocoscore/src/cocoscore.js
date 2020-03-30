const Config = require('./config');
const ConfigureError = require('./errors/configureError');
const { apiTypes } = require('./constants');

const { VK } = require('vk-io');
const { inspect } = require('util');
const createDebug = require('debug');

const debug = createDebug('cocoscore:configure');

const {
    CALLBACK,
    LONGPOLL
} = apiTypes;

class CocosCore {
    constructor(options) {
        if (!(options instanceof Config)) {
            throw new ConfigureError('CocosCore parameter must be Config class');
        }

        this.options = options;
    }

    get [Symbol.toStringTag]() {
        return this.constructor.name;
    }

    async configure() {
        if (!this.options.apiType) {
            throw new ConfigureError('Option apiType in Config is not defined');
        }

        this.vk = new VK({
            token: this.options.token,
            apiLimit: this.options.apiLimit,
            apiMode: this.options.apiMode
        });

        debug('apiType:', this.options.apiType);

        if (this.options.apiType === LONGPOLL) {
            debug('start polling');

            await this.vk.updates.startPolling();

            this.options.groupId = this.vk.options.pollingGroupId;
        }

        if (this.options.apiType === CALLBACK) {
            const {
                secret,
                confirmation
            } = this.options.webhookOptions;

            this.vk.setOptions({
                webhookSecret: secret,
                webhookConfirmation: confirmation
            });

            debug('start webhook');

            await this.vk.updates.startWebhook(this.options.webhookOptions);
        }

        if (!this.vk.updates.isStarted) {
            debug('wrong apiType');

            throw new ConfigureError('apiType parameter must be "longpoll" or "callback"');
        }
    }

    async start() {
        await this.configure();
    }

    [inspect.custom](depth, option) {
        const { name } = this.constructor;

        const {
            options,
            vk
        } = this;

        const payload = {
            options,
            vk
        };

        return `${option.stylize(name, 'special')} ${inspect(payload, option)}`;
    }
}

module.exports = CocosCore;
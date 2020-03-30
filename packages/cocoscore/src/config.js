const { defaultOptions } = require('./constants');
const { inspect } = require('util');

class Config {
    constructor(options) {
        this.set(defaultOptions);

        this.set(options);
    }

    get [Symbol.toStringTag]() {
        return this.constructor.name;
    }

    set(options) {
        for (const option in options) {
            this[option] = options[option];
        }
    }

    [inspect.custom](depth, options) {
        const { name } = this.constructor;

        const payload = {
            ...this
        };        

        return `${options.stylize(name, 'special')} ${inspect(payload, options)}`;
    }
}

module.exports = Config;
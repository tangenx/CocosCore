class ConfigureError extends Error {
    constructor(message) {
        super(message);

        this.message = message;
        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);
    }

    get [Symbol.toStringTag]() {
        return this.constructor.name;
    }
}

module.exports = ConfigureError;
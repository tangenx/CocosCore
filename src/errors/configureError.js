class ConfigureError extends Error {
    constructor(params) {
        super(params);

        this.message = params;
        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ConfigureError;

export default class Logger {
    /**
     * @param directory Директория, куда будут сохраняться логи
     */
    constructor(directory: string);

    log(...message: any): void;

    ok(...message: any): void;

    error(...message: any): void;

    warn(...message: any): void;

    info(...message: any): void;
}


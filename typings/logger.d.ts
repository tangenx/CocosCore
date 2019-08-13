export default class Logger {
    /**
     * @param directory Директория, куда будут сохраняться логи
     */
    public constructor(directory: string);

    public log(...message: any): void;

    public ok(...message: any): void;

    public error(...message: any): void;

    public warn(...message: any): void;

    public info(...message: any): void;
}

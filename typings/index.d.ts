import { VK } from 'vk-io';
import Command from './command';
import Commander from './commander';
import Logger from './logger';
import * as Params from './params';
import Utils from './utils';
import DBManager from './databaseManager';

declare class CocosCoreBot {
    public vk: VK;
    public logger: Logger;
    public db: DBManager;
    private commander: Commander;
    private trigger: RegExp;

    public constructor(params: Params.IBotConfigure);

    /**
     * Запуск бота
     */
    public start(): void;
    
    /**
     * Конфигурирование бота
     */
    private configure(): Promise<void>;

    /**
     * Подключение MongoDB к боту
     */
    private connectMongoDB(): Promise<void>;

    /**
     * Запуск "прослушки" сообщений
     */
    private startListener(): void;
}

export { CocosCoreBot, Command, Utils };

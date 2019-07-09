import { VK } from 'vk-io';
import Command from './typings/command';
import Commander from './typings/commander';
import Logger from './typings/logger';
import * as Params from './typings/params';
import Utils from './typings/utils';
import DBManager from './typings/databaseManager';

declare class CocosCoreBot {
    public vk: VK;
    public logger: Logger;
    public db: DBManager;
    private commander: Commander;
    private trigger: RegExp;

    public constructor(params: Params.IBotConfigure);

    /**
     * Конфигурирование бота
     */
    public configure(): Promise<void>;

    /**
     * Подключение MongoDB к боту
     */
    public connectMongoDB(url: string): Promise<void>;

    /**
     * Запуск "прослушки" сообщений
     */
    public startListener(): void;

    /**
     * Запуск бота
     */
    public start(): void;
}

export { CocosCoreBot, Command, Utils };

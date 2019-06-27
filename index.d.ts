import { VK } from 'vk-io';
import * as Params from './typings/params';
import Logger from './typings/logger';
import Command from './typings/command';
import Commander from './typings/commander';
import Utils from './typings/utils';

declare class CocosCoreBot {
    private commander: Commander;
    public vk: VK;
    public logger: Logger;
    private trigger: RegExp;

    constructor(params: Params.IBotConfigure);
    
    /**
     * Конфигурирование бота
     */
    public configure(): Promise<void>;

    /**
     * Подключение MongoDB к боту
     */
    public connectMongoDB(): Promise<void>;

    /**
     * Запуск "прослушки" сообщений
     */
    public startListener(): void;
}

export { CocosCoreBot, Command, Utils };

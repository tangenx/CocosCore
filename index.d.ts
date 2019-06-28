import { VK } from 'vk-io';
import Command from './typings/command';
import Commander from './typings/commander';
import Logger from './typings/logger';
import * as Params from './typings/params';
import Utils from './typings/utils';

declare class CocosCoreBot {
    public vk: VK;
    public logger: Logger;
    private commander: Commander;
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

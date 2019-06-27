import { VK } from 'vk-io';
import * as Params from './typings/params';
import Logger from './typings/logger';
import Command from './typings/command';
import Commander from './typings/commander';
import Utils from './typings/utils';

declare class CocosCoreBot {
    constructor(params: Params.IBotConfigure);

    commander: Commander;
    vk: VK;
    logger: Logger;
    trigger: RegExp;

    /**
     * Конфигурирование бота
     */
    configure(): Promise<void>;

    /**
     * Подключение MongoDB к боту
     */
    connectMongoDB(): Promise<void>;

    /**
     * Запуск "прослушки" сообщений
     */
    startListener(): void;
}

export { CocosCoreBot, Command, Utils };
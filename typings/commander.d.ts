import { MessageContext } from 'vk-io';
import Command from './command';

export default class Commander {
    commands: Array<Command>;

    /**
     * Загрузка команд в бота
     * @param dir Директория, где находятся команды бота
     */
    loadCommands(dir: string): Promise<void>;

    /**
     * Поиск команды
     * @param context Контекст сообщения
     */
    findCommand(context: MessageContext): Command | null;
}
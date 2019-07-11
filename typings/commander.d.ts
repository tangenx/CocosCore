import { MessageContext } from 'vk-io';
import Command from './command';

export default class Commander {
    public commands: Command[];

    /**
     * Загрузка команд в бота
     * @param dir Директория, где находятся команды бота
     */
    private loadFromDirectory(dir: string): Promise<void>;

    /**
     * Поиск команды
     * @param context Контекст сообщения
     */
    private find(context: MessageContext): Command | null;
}

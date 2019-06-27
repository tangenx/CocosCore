import { MessageContext } from 'vk-io';
import Command from './command';

export default class Commander {
    public commands: Array<Command>;

    /**
     * Загрузка команд в бота
     * @param dir Директория, где находятся команды бота
     */
    private loadCommands(dir: string): Promise<void>;

    /**
     * Поиск команды
     * @param context Контекст сообщения
     */
    private findCommand(context: MessageContext): Command | null;
}

import { MessageContext, Keyboard } from 'vk-io';
import { CocosCoreBot } from '../index';
import Command from './command';

interface IMessageParams {
    /**
     * Идентификатор пользователя, которому отправляется сообщение
     */
    user_id?: number;

    /**
     * уникальный идентификатор, предназначенный для предотвращения повторной отправки одинакового сообщения
     */
    random_id?: number;

    /**
     * Идентификатор назначения:
     * 
     * Для пользователя: 
     * id пользователя. 
     *
     * Для групповой беседы: 
     * 2000000000 + id беседы. 
     *
     * Для сообщества: 
     * -id сообщества.
     */
    peer_id?: number;

    /**
     * Короткий адрес пользователя (например, tgx_indexof).
     */
    domain?: string;

    /**
     * Идентификатор беседы, к которой будет относиться сообщение
     */
    chat_id?: number;

    /**
     * Идентификаторы получателей сообщения
     */
    user_ids?: Array<number>;

    /**
     * Текст сообщения
     */
    message?: string;

    /**
     * Географическая широта
     */
    lat?: number;

    /**
     * Географическая долгота
     */
    long?: number;

    /**
     * Медиавложения к личному сообщению, перечисленные через запятую
     */
    attachment?: string;

    /**
     * Идентификатор сообщения, на которое требуется ответить
     */
    reply_to?: number;

    /**
     * Идентификаторы пересылаемых сообщений, перечисленные через запятую
     */
    forward_messages?: string;

    /**
     * Идентификатор стикера
     */
    sticker_id?: number;

    /**
     * Идентификатор сообщества
     */
    group_id?: number;

    /**
     * Клавиатура бота (vk-io)
     */
    keyboard?: Keyboard;

    /**
     * Полезная нагрузка
     */
    payload?: string;

    /**
     * 1 — не создавать сниппет ссылки из сообщения
     */
    dont_parse_links?: number;

    /**
     * 1 - отключить уведомление об упоминании в сообщении
     */
    disable_mentions?: number;

    /**
     * Эмодзи перед отправляемым сообщением
     */
    emoji?: string;
}

declare class Message extends MessageContext {
    /**
     * Аргументы, обработанные триггером команды
     */
    body: Array<string>;

    send(text?: string, params?: IMessageParams): Promise<number>;

    error(text?: string, params?: IMessageParams): Promise<number>;

    sendOrig(text?: string, params?: IMessageParams): Promise<number>;

    sendSticker(id: number): Promise<number>;
}

export interface IBotConfigure {
    /**
     * Токен бота
     */
    token: string;

    /**
     * ID группы бота
     */
    groupId?: number;

    /**
     * ID разрабочика бота
     */
    developerId?: number;

    /**
     * Обращения к боту
     */
    aliases: Array<string>;

    /**
     * Обращение с начала сообщения
     */
    aliasesFromStart?: boolean;

    /**
     * Чат-бот
     */
    chatBot?: boolean;

    /**
     * Режим работы API (vk-io)
     */
    apiMode?: string;

    /**
     * Количество запросов к API в секунду (vk-io)
     */
    apiLimit?: number;

    /**
     * Директория, куда будут сохраняться логи бота
     */
    logsDirectory?: string;

    /**
     * Директория, где расположены команды
     */
    commandsDirectory: string
}

export interface ICommandParams {
    /**
     * Триггер команды
     */
    trigger: RegExp;

    /**
     * Название команды
     */
    name?: string;

    /**
     * Краткое описание команды
     */
    description?: string;

    /**
     * Обработчик команды
     */
    handler: (context: Message, bot: CocosCoreBot) => void;

    /**
     * Эмодзи с обозначением команды
     */
    emoji?: string;

    /**
     * Подкоманды
     */
    commands?: Array<Command>;

    /**
     * Права доступа к команде
     */
    permission?: number;
}
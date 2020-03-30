import { Options } from './constants';

declare class Config {    
    /**
     * Constructor
     */
    constructor(options: Options);

    public set(options: Options): void;

    /**
     * Токен бота
     */
    public token: Options['token'];

    /**
     * ID разработчика бота
     */
    public developerId: Options['developerId'];

    /**
     * Алиасы бота
     */
    public aliases: Options['aliases'];
    
    /**
     * Алиасы работают только с начала сообщения
     */
    public aliasesFromStart: Options['aliasesFromStart'];

    /**
     * Функция чат-бота
     */
    public chatBot: Options['chatBot'];

    /**
     * Сервис чат-бота: xu-su или iHA
     */
    public defaultChatBotService: Options['defaultChatBotService'];

    /**
     * Директория для команд
     */
    public commandsDirectory: Options['commandsDirectory'];

    /** 
     * Обработка сообщений с кнопок
     */
    public handleMessagePayload: Options['handleMessagePayload'];

    /**
     * Стандартные сообщения
     */
    public defaultMessages: Options['defaultMessages'];
}

export default Config;
type apiTypes = 'longpoll' | 'callback';

interface Options {
    /**
     * Токен бота
     */
    token: string;

    /**
     * Тип используемого API
     */
    apiType: apiTypes

    /**
     * Количество запросов в секунду
     */
    apiLimit?: number;

    /**
     * Режим работы API
     */
    apiMode?: string;

    /**
     * Опции webhook-сервера
     */
    webhookOptions: {
         /**
         * Секретный ключ для проверки запросов
         */
        secret: string;

         /**
         * Строка подтверждения сервера
         */
        confirmation: string;

        /**
         * Хост сервера
         */
        host: string;

        /**
         * TLS Options Server
         */
        tls: object;

        /**
         * Путь обработки запроса
         */
        path: string;
        
        /**
         * Порт сервера
         */
        port: number;
    };

    /**
     * ID разработчика бота
     */
    developerId?: number;

    /**
     * Алиасы бота
     */
    aliases?: Array<string>;

    /**
     * Алиасы работают только с начала сообщения
     */
    aliasesFromStart?: boolean;

    /**
     * Функция чат-бота
     */
    chatBot?: boolean;

    /**
     * Сервис чат-бота: xu-su или iHA
     */
    defaultChatBotService?: string;

    /**
     * Директория для команд
     */
    commandsDirectory: string;

    /**
     * Обработка сообщений с кнопок
     */
    handleMessagePayload?: boolean;

    /**
     * Стандартные сообщения
     */
    defaultMessages?: {
        /**
         * Сообщение, если команда не найдена
         */
        onCommandNotFound?: string;

        /**
         * Сообщение при непредвиденной ошибке при выполнении команда
         */
        onError?: string;
    };
}

export {
    Options
};
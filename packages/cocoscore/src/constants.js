const defaultOptions = {
    token: null,
    apiType: null,
    apiMode: 'sequential',
    apiLimit: 20,
    webhookOptions: {
        secret: null,
        confirmation: null,
        host: null,
        tls: null,
        path: null,
        port: null
    },

    developerId: null,

    aliases: [],
    aliasesFromStart: true,

    chatBot: false,
    defaultChatBotService: null,

    commandsDirectory: null,

    handleMessagePayload: false,

    defaultMessages: {
        onCommandNotFound: 'команда не найдена! Проверьте правильность введённых данных и попробуйте ещё раз.',
        onError: 'произошла непредвиденная ошибка.'
    }
};

const apiTypes = {
    LONGPOLL: 'longpoll',
    CALLBACK: 'callback'
};

module.exports = {
    defaultOptions,
    apiTypes
};
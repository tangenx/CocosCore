const Utils = require('../utils');
const chattingCommand = require('../commander/chattingCommand');

async function messageHandler(context, bot) {
    if (context.out || context.isGroup) return;

    let startTime = Date.now();

    context.gamemodeUser = bot.gamemodeUsers.get(context.senderId);

    if (!context.gamemodeUser) {
        bot.gamemodeUsers.set(context.senderId, false);
        context.gamemodeUser = false;
    }

    if (context.isChat && !context.gamemodeUser && !bot.trigger.test(context.text)) return;

    if (bot.db) context.user = await bot.db.getUser(context, bot);
    if (context.isChat && bot.db) context.chat = await bot.db.getChat(context.chatId);

    if (bot.trigger.test(context.text) && context.isChat) {
        context.text = context.text.replace(bot.trigger, '').trim();
    }

    context.send = function(text = '', params = {}) {
        let message = `${!params.emoji ? '' : `${params.emoji} `}`;
        if (context.isChat) {
            if (context.user) {
                message += `${context.user.mention ? `[id${context.user.vkId}|${context.user.nickname}]` : context.user.nickname}, ${!text ? text : `${text[0].toLowerCase()}${text.slice(1)}`}`;
            } else {
                message += text;
            }
        } else {
            message += `${!text ? text : `${text[0].toUpperCase()}${text.slice(1)}`}`;
        }

        delete params.emoji;

        params.message = message;
        params.peer_id = context.peerId;

        return bot.vk.api.messages.send(params);
    };

    context.error = function(text = '', params = {}) {
        context.send(text, Object.assign(params, { emoji: '❌' }));
    };

    context.sendOrig = function(text = '', params = {}) {
        params.message = text;
        params.peer_id = context.peerId;
        return bot.vk.api.messages.send(params);
    };

    context.sendSticker = function(id) {
        return context.sendOrig('', {
            sticker_id: id
        });
    };

    let command = bot.commander.findCommand(context);
    if (!command) {
        if (bot.chatBot) {
            command = chattingCommand;
        } else {
            if (context.isChat) return;
            return context.error('команда не найдена! Проверьте правильность введённых данных и попробуйте ещё раз.');
        }
    }

    if (context.user && command.permission > context.user.permission) return context.error('недостаточно прав для выполнения команды.');

    try {
        await command.handler(context, bot);
    } catch (error) {
        context.error('произошла непредвиденная ошибка.');

        if (bot.developerId) {
            bot.vk.api.messages.send({
                peer_id: bot.developerId,
                message: `Ошибка в команде ${command.name}: \n${context.senderId} => ${context.text}\n${error.stack}`
            });
        }
    };

    if (bot.db) await context.user.save();
    if (context.isChat && bot.db) await context.chat.save();

    let endTime = Date.now();

    bot.logger.log(`${Utils.getTimeString()} [${context.isChat ? `chat #${context.chatId}` : 'личка'}] ${context.senderId} => ${context.text} (${endTime - startTime} ms.)`);
}

module.exports = messageHandler;

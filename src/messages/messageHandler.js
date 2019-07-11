const Utils = require('../utils');
const chattingCommand = require('../commander/chattingCommand');

async function messageHandler(context, bot) {
    if (context.isOutbox || context.isGroup) return;

    let startTime = Date.now();

    if (bot.gamemodeUsers) {
        context.gamemodeUser = bot.gamemodeUsers.get(context.senderId);
    }

    if (!context.gamemodeUser && bot.gamemodeUsers) {
        bot.gamemodeUsers.set(context.senderId, false);
        context.gamemodeUser = false;
    }

    if (context.isChat && !context.gamemodeUser && bot.gamemodeUsers && !bot.trigger.test(context.text)) return;

    if (bot.db) context.user = await bot.db.getUser(context.senderId, bot);
    if (context.isChat && bot.db) context.chat = await bot.db.getChat(context.chatId);

    if (context.user && context.user.ban) return;

    if (bot.trigger.test(context.text) && context.isChat) {
        context.text = context.text.replace(bot.trigger, '').trim();
    }

    context.send = function(text, params = {}) {
        let rawMessage = `${!params.emoji ? '' : `${params.emoji} `}`;

        let messageText;
        
        if (typeof text === 'object') {
            messageText = text.message;
            delete text.message;
        } else {
            messageText = text
        }

        if (!messageText) {
            messageText = ''
        }

        if (context.isChat || context.user) {
            rawMessage += `${context.user && context.user.mention ? `[id${context.user.vkId}|${context.user.nickname}]` : context.user.nickname}, ${!messageText ? messageText : `${messageText[0].toLowerCase()}${messageText.slice(1)}`}`;
        } else {
            rawMessage += `${!messageText ? messageText : `${messageText[0].toUpperCase()}${messageText.slice(1)}`}`;
        }       

        delete params.emoji;        

        return bot.vk.api.messages.send({
            peer_id: context.peerId,
            message: rawMessage,
            
            ...(
				typeof text !== 'object'
					? {
						...params
					}
					: {
                        ...text
                    }
			)
        });
    };

    context.error = function(text, params = {}) {
        context.send(text, Object.assign(params, { emoji: '❌' }));
    };

    context.sendOrig = function(text, params = {}) {
        return bot.vk.api.messages.send({
			peer_id: context.peerId,

			...(
				typeof text !== 'object'
					? {
						message: text,

						...params
					}
					: text
			)
		});
    };

    context.sendSticker = function(id) {
        return context.sendOrig({
            sticker_id: id
        });
    };

    let command = bot.commander.find(context);
    if (!command) {
        if (bot.chatBot && bot.gamemodeUsers && !context.gamemodeUser || context.gamemodeUser && !context.isChat) {
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
        bot.logger.error(error);

        if (bot.developerId) {
            bot.vk.api.messages.send({
                peer_id: bot.developerId,
                message: `Ошибка в команде ${command.name}: \n${context.senderId} => ${context.text}\n${error.stack}`
            });
        }
    }

    if (bot.db) await context.user.save();
    if (context.isChat && bot.db) await context.chat.save();

    let endTime = Date.now();

    bot.logger.log(`${Utils.getTimeString()} [${context.isChat ? `chat #${context.chatId}` : 'личка'}] ${context.senderId} => ${context.text} (${endTime - startTime} ms.)`);
}

module.exports = messageHandler;

# Запуск

Импорт

```js
const { CocosCoreBot, Command, Utils } = require('cocoscore');
```

## Конструктор

Инициализация

```js
const bot = new CocosCoreBot(options);
```

## Options

Общие опции:

| Опция             | Тип      | Описание                            | По умолчанию |
| ----------------- | -------- | ----------------------------------- | ------------ |
| token             | string   | Токен бота                          | null         |
| groupId           | number   | ID группы                           | null         |
| developerId       | number   | ID разработчика                     | null         |
| commandsDirectory | string   | Директория команд                   | null         |
| logsDirectory     | string   | Директория хранения логов           | null         |
| aliases           | string[] | Обращения к боту                    | []           |
| aliasesFromStart  | boolean  | Обращения к боту с начала сообщения | true         |
| chatBot           | boolean  | Чат-бот                             | true         |

Сервис чат-бота можно изменить в файле src/commander/chattingCommand.js

Опции API:

| Опция    | Тип    | Описание                            | По умолчанию |
| -------- | ------ | ----------------------------------- | ------------ |
| apiMode  | string | Режим работы API                    | sequential   |
| apiLimit | number | Количество запросов к API в секунду | 20           |

## Конфигурирование

```js
bot.configure();
```

Производит конфигурирование бота: инициализация инстанции vk-io, загрузка команд и установка триггера бота.

## Подключение БД

В качестве БД в CocosCore используется MongoDB.
Основные модели и менеджер БД уже есть в ядре, по желанию схемы можно отредактировать для своих нужд (но поле nickname должно присутствовать **обязательно**) в директории database ядра.

```js
bot.connectMongoDB(uri);
```

| Опция | Тип    | Описание           |
| ----- | ------ | ------------------ |
| uri   | string | Адрес сервера с БД |

## Запуск бота

Запуск "прослушки" сообщений === запуск бота

```js
bot.startListener();
```

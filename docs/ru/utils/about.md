# Utils

Utils - класс, содержащий вспомогательные методы для Ваших нужд.

Список методов:

| Метод            | Описание                                        |
| ---------------- | ----------------------------------------------- |
| getTimeString    | Возвращает текущее время                        |
| getDateString    | Возвращает текущую дату                         |
| getRandomInRange | Возвращает случайное число в промежутке min-max |
| getBuffer        | Возвращает буфер файла                          |
| declOfNum        | Склоняет слово в зависимости от числа           |
| getRandomElement | Возвращает случайный элемент массива            |
| numberSeparator  | Разделитель тысяч целого числа                  |

## Примеры

### getTimeString

```js
Utils.getTimeString(); // 01:33:13
```

### getDateString

```js
Utils.getDateString(); // 6/28/2019
```

### getRandomInRange

```js
Utils.getRandomInRange(10, 50); // 45
```

### getBuffer

```js
await Utils.getBuffer('https://pp.userapi.com/c854424/v854424542/80c65/PWVioM5u77M.jpg'); // Buffer
```

### declOfNum

```js
Utils.declOfNum(10, ['рубль', 'рубля', 'рублей']); // рублей
```

### getRandomElement

```js
Utils.getRandomElement(['Я', 'читаю', 'эту', 'документацию']); // читаю
```

### numberSeparator

```js
Utils.numberSeparator(5000); //5.000
```

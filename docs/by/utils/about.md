# Utils

Utils - тып, які змяшчае дапаможныя метады для Вашых патрэб.

Спіс метадаў:

| Метад            | Апісанне                                |
| ---------------- | --------------------------------------- |
| getTimeString    | Вяртае сучасны час                      |
| getDateString    | Вяртае сучасную дату                    |
| getRandomInRange | Вяртае выпадковы лік у прамежку min-max |
| getBuffer        | Вяртае буфер файла                      |
| declOfNum        | Скланяе слова ў залежнасці ад лика      |
| getRandomElement | Вяртае выпадковы элемент масіва         |

## Прыклады

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
Utils.declOfNum(10, ['рубель', 'рубля', 'рублёў']); // рублёў
```

### getRandomElement

```js
Utils.getRandomElement(['Я', 'чытаю', 'гэту', 'дакументацыю']); // чытаю
```

### numberSeparator

```js
Utils.numberSeparator(5000); //5.000
```

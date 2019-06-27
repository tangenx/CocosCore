const fetch = require('node-fetch');

class Utils {
    static getTimeString() {
        let date = new Date();

        return `${date.toLocaleTimeString('ru-RU')}`;
    };

    static getDateString() {
        let date = new Date();

        return `${date.toLocaleDateString('ru-RU')}`;
    };

    static getRandomInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    static async getBuffer(url) {
        let response = await fetch(url);
        return response.buffer();
    };

    static declOfNum(number, titles) {
        let cases = [2, 0, 1, 1, 1, 2];

        return titles[
            (
                number % 100 > 4 &&
                number % 100 < 20
            ) ? 2 : cases[
                (number % 10 < 5) ? number % 10 : 5
            ]
        ];
    };

    static getRandomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    };
};

module.exports = Utils;
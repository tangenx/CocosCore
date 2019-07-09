const fetch = require('node-fetch');
const { format } = require('date-fns'); 

class Utils {
    static getTimeString() {
        return format(new Date(), 'HH:mm:ss');
    }

    static getDateString() {
        return format(new Date(), 'DD.MM.YYYY');
    }

    static getRandomInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static async getBuffer(url) {
        let response = await fetch(url);
        return response.buffer();
    }

    static declOfNum(num, titles) {
        let cases = [2, 0, 1, 1, 1, 2];

        return titles[
            (
                num % 100 > 4 &&
                num % 100 < 20
            ) ? 2 : cases[
                    (num % 10 < 5) ? num % 10 : 5
                ]
        ];
    }

    static getRandomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    static flat(array, depth = 1) {
        depth = Number.isNaN(depth) ? 0 : Math.floor(depth);
        if (depth < 1) return array.slice();

        return [].concat(
            ...(depth < 2)
                ? array
                : array.map(v => Array.isArray(v) ? v.flat(depth - 1) : v)
        );
    }
}

module.exports = Utils;

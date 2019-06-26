export default class Utils {
    static getTimeString(): string;

    static getDateString(): string;

    static getRandomInRange(min: number, max: number): number;

    static getBuffer(url: string): Promise<Buffer>;

    static declOfNum(number: number, titles: Array<string>): string;

    static getRandomElement(arr: Array<any>): any;
}


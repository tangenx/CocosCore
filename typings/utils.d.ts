export default class Utils {
    public static getTimeString(): string;

    public static getDateString(): string;

    public static getRandomInRange(min: number, max: number): number;

    public static getBuffer(url: string): Promise<Buffer>;

    public static declOfNum(num: number, titles: Array<string>): string;

    public static getRandomElement(arr: Array<any>): any;
}

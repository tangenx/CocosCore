export default class Utils {
    public static getTimeString(): string;

    public static getDateString(): string;

    public static getRandomInRange(min: number, max: number): number;

    public static getBuffer(url: string): Promise<Buffer>;

    public static declOfNum(num: number, titles: string[]): string;

    public static getRandomElement(arr: any[]): any;

    public static numberSeparator(num: number | string): string;
}

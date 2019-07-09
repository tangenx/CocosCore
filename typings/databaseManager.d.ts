import { Collection } from 'mongoose';
import { CocosCoreBot } from '../index';

declare class DBManager {
    public models: {
        user: Collection;
        chat: Collection;
    }

    private constructor(uri: string);

    /**
     * Установка модели в БД
     * 
     * @param rawName Имя модели
     * @param rawSchema Схема модели
     */
    public setModel(rawName: string, rawSchema: object): Collection;

    /**
     * Получить модель из БД
     * 
     * @param rawName Имя модели
     */
    public getModel(rawName: string): Collection;

    /**
     * Получить объект пользователя из БД
     * 
     * @param senderId ID VK пользователя
     * @param bot Объект бота
     */
    private getUser(senderId: number, bot: CocosCoreBot): Promise<Collection>;

    /**
     * Получить объект чата из БД
     * 
     * @param id ID чата
     */
    private getChat(id: number): Promise<Collection>;
}

export = DBManager;

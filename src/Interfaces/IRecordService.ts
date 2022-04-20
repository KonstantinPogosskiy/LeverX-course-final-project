import {IRecord} from "./IRecord";

export interface IRecordService {
    createRecord(payload): Promise<IRecord>;
    getAllRecords(): Promise<IRecord[]>;
    getRecordByAuthor(author: string): Promise<IRecord[]>;
    getRecordByName(name: string): Promise<IRecord[]>;
    getRecordById(record_id: number): Promise<IRecord>;
    changeRecord(id: number, author?: string, name?: string, description?: string, price?: number): void;
    checkBought(id: number);
    markAsPurchased(profile_id, record_id): Promise<void>;
    deleteRecord(record_id: number): void;
}
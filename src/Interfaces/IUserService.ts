import {IUser} from "./IUser";

export interface IUserService {
    createUser(payload): Promise<IUser>;
    getUserById(user_id: number): Promise<IUser>;
    getAllUsers(): Promise<IUser[]>;
    checkEmail(email: string): Promise<IUser>;
    checkPassword(password: string): Promise<IUser>;
}
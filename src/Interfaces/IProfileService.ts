import {IProfile} from "./IProfile";

export interface IProfileService {
    createProfile(payload): void
    updateProfile(id: number, user_id: number, firstName?: string, lastName?: string): void;
    getProfileById(id: number): Promise<IProfile>;
    accessToProfile(id: number): Promise<IProfile>;
}
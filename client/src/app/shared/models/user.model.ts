import { IcPermission } from "./cPermission.model";
import { IUserGroup } from "./user-group.model";
import { ICountry, ICity } from 'country-state-city'
export interface IUser {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: Date;
    updatedAt: Date;
    userExtended: IUserExtended;
    user_groups: IUserGroup[];
    user_settings: IUserSettings;
}

interface IUserExtended {
    firstName: string;
    lastName: string;
    avatar: any;
    country: ICountry;
    city: ICity;
}
interface IUserSettings {
    theme: string;
    language: string;
    applicationsPlace: string;
}

export interface IRole {
    id: number;
    createdAt: string;
    description: string;
    name: string;
    type: string;
    updatedAt: string;
}

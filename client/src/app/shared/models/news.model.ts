import { IUser } from "./user.model";

export interface INews {
    id: string;
    author: IUser;
    title: string;
    content: string;
    createdAt?: string;
    updatedAt?: string;
}
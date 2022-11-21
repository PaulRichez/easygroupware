import { IUser } from "./user.model";

export interface IFolder {
    id: string;
    name: string;
    owner: IUser | null;
    files?: any;
    parent?: IFolder
    children: IFolder[] | { count: number }
    createdAt: Date;
    updatedAt: Date;
}
import { IcPermission } from "./cPermission.model";

export interface IUserGroup {
    id: string;
    name: string;
    description: string;
    permissions: IcPermission[];
    createdAt?: Date;
    updatedAt?: Date;
}
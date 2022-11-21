import { ICity, ICountry } from "country-state-city";
import { IUser } from "./user.model";

export interface IContact {
    id: number;
    owner: IUser;
    name: IName;
    user?: IUser;
    pro: IBloc;
    private: IBloc;

}

interface IName {
    firstName: string;
    lastName: string;
    civility: string;
}

interface IBloc {
    contacts: IBlocContact;
    address: IBlocAdress;
    role?: string;
}

interface IBlocContact {
    mobilePhone: string;
    fixPhone: string;
    otherPhone: string;
    url: string;
    email: string;
}

interface IBlocAdress {
    country: ICountry;
    city: ICity;
    street1: string;
    street2: string;
}


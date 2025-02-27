import { IContact } from "./contacts";

export interface IContactResponse {
    limit: number;     
    contacts: IContact[]; 
    skip: number;      
    total: number;      
}


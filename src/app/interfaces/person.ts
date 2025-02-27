import { IContact } from "./contacts";


export interface IPerson {
    id: number;
    nome: string;
    endereco?: string;
    cep?: string;
    cidade?: string;
    uf?: string;
    contatos?: IContact[];
}

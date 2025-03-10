import { IPerson } from "./person";

export interface IContact {
    id: number;
    tipoContato: 'TELEFONE' | 'CELULAR'; 
    contato: string; 
    pessoaId: number; 
}

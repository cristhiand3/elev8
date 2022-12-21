import { Categoria } from './categoria';

export interface Gasto {
    id ?: string;
    nombre : string;
    categoria : Categoria;
    nombreCategoria ?: string;
    valor : number;
}

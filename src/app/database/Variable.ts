import { Token } from "src/app/database/Token" 
import { TipoDato } from "./Tabla";

export class Variable extends Token{

    nombre: String | undefined;
    valor: any;
    tipo:TipoDato;

    constructor(
        line: number,
        column: number,
        nombre: String | undefined,
        tipo:TipoDato,
        valor: any
      ) {
        super(line, column);
        this.nombre = nombre;
        this.tipo = tipo ;
        this.valor = valor;
      }

}
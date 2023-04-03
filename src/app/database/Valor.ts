import { Token } from "src/app/database/Token" 
import { TipoDato } from "./Tabla";

export class Valor extends Token{

    valor: any;
    tipo:TipoDato;

    constructor(
        line: number,
        column: number,
        valor: any,
        tipo:TipoDato
      ) {
        super(line, column);
        this.valor = valor ;
        this.tipo = tipo ;
      }

}
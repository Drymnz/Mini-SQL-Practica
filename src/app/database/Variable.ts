import { TipoDato } from "./Tabla";
import { Valor } from "./Valor";

export class Variable extends Valor{

    nombre: String | undefined;

    constructor(
        line: number,
        column: number,
        nombre: String | undefined,
        tipo:TipoDato,
        valor: any
      ) {
        super(line, column,valor,tipo);
        this.nombre = nombre;
      }

}
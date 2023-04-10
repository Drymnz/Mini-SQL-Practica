import { Token } from "src/app/database/Token" 
import { TipoDato } from "./Tabla";

export class Declaracion extends Token{

    nombre: String[] = [];
    tipo:TipoDato;
    valor: any ;

    constructor(
        line: number,
        column: number,
        nombre: String[] = [],
        tipo:TipoDato,
        valor: any
      ) {
        super(line, column);
        this.nombre = nombre;
        this.tipo = tipo ;
        this.valor = valor;
      }

}
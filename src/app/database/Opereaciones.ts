import { Token } from "src/app/database/Token" 
import { TipoDato } from "./Tabla";

export class Opereaciones extends Token{

    tipo:TipoOperacion;
    derechaDato:Token | undefined;
    izquierdaDato:Token | undefined;

    constructor(
        line: number,
        column: number,
        tipo:TipoOperacion,
        izquierdaDato:Token | undefined,
        derechaDato:Token | undefined
      ) {
        super(line, column);
        this.tipo = tipo ;
        this.derechaDato = derechaDato;
        this.izquierdaDato = izquierdaDato;
      }

}

export enum TipoOperacion {
    NEGACION,
    AND,
    OR,
    NO_IGUAL,
    MAYOR_IGUAL,
    MAYOR,
    MENOR_IGUAL,
    MENOR,
    IGUAL,
    NEGATIVO,
    DIVISION,
    MULTIPLICACION,
    RESTA,
    SUMA,
}
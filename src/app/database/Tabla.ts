import { Token } from "src/app/database/Token"

export  class Tabla extends Token{
    name: any;
    listadoAtributo:Atributo[] = [];

    constructor(
        line: number,
        column: number,
        name: any,
        listadoAtributo:Atributo[]
      ) {
        super(line, column);
        this.name = name ;
        this.listadoAtributo = listadoAtributo;
      }
    
}

export class Atributo extends Token{

    name: any;
    tipo:TipoDato;

    constructor(
        line: number,
        column: number,
        name: any,
        tipo:TipoDato
      ) {
        super(line, column);
        this.name = name ;
        this.tipo = tipo ;
      }

}

export enum TipoDato {
    INT,
    DECIMAL,
    STRING,
    BOOLEAN,
    VARIABLE,
    ENTRADA
}
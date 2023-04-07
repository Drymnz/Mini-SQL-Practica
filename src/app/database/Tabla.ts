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

      getListadoNombreAtriguto():String[]
      {
        var listado:String[] = [];
        this.listadoAtributo.forEach(element => {
          listado.push(String(element.name));
        });
        return listado;
      }
}

export class Atributo extends Token{

    name: String;
    tipo:TipoDato;

    constructor(
        line: number,
        column: number,
        name: String,
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
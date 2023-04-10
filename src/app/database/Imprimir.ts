import { Token } from "src/app/database/Token" 

export class Imprimir extends Token{

    listadoValores:Token[] = [];

    constructor(
        line: number,
        column: number,
        listadoValores:Token[] = []
      ) {
        super(line, column);
        this.listadoValores = listadoValores;
      }

}
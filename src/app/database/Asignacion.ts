import { Token } from "src/app/database/Token" 

export class Asignacion extends Token{

    nombre: any;
    valor:Token | undefined;

    constructor(
        line: number,
        column: number,
        nombre: any,
        valor:Token | undefined
      ) {
        super(line, column);
        this.nombre = nombre ;
        this.valor = valor;
      }

}
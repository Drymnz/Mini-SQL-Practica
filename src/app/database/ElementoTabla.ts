import { Token } from "src/app/database/Token" 
import { Asignacion } from "./Asignacion";

export  class ElementoTabla extends Token{

  listadoAtributos:Asignacion[] = [];

    constructor(
        line: number,
        column: number,
        listadoAtributos:Asignacion[] = []
      ) {
        super(line, column);
        this.listadoAtributos = listadoAtributos;
      }
    
}
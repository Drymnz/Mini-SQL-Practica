import { Token } from "src/app/database/Token" 
import { Asignacion } from "./Asignacion";

export class Set extends Token{

    listadoAsignacion: Asignacion[] = [];

    constructor(
        line: number,
        column: number,
        listadoAsignacion: Asignacion[] = []
      ) {
        super(line, column);
        this.listadoAsignacion = listadoAsignacion;
      }

}
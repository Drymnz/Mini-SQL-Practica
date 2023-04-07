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
      getListadoValores():String[]
      {
        const listado:String[]|undefined = [];
        this.listadoAtributos.forEach(element => {
          listado.push(String(element.getValor()));
        });
        return listado;
      }
}
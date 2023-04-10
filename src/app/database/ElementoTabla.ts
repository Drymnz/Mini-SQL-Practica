import { Token } from "src/app/database/Token" 
import { Asignacion } from "./Asignacion";
import { Valor } from "./Valor";

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
        const listado:String[] = [];
        this.listadoAtributos.forEach(element => {
          const valorInsert:Valor = element.getValor();
          if (valorInsert != undefined) {
            listado.push(String(valorInsert.valor));
          }
        });
        return listado;
      }
}
import { Tabla,Atributo,TipoDato } from "src/app/database/Tabla"
import { ElementoTabla } from "../database/ElementoTabla";

export class TablaEjecucion {

    tablas:Tabla;
    listadoElementos: ElementoTabla[]=[];

    constructor(tablas:Tabla){
        this.tablas =tablas;
    }

    addElemento(elemento:ElementoTabla){
        this.listadoElementos.push(elemento);
    }
    getListadoValores():String[]|undefined
    {
      const listado:String[]|undefined = [];
      this.listadoElementos.forEach(element => {
        listado.push(String(element.getListadoValores()));
      });
      return listado;
    }

  }
  
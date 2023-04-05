// para analizar
import { Token } from "src/app/database/Token"
import { Tabla,Atributo,TipoDato } from "src/app/database/Tabla"
import { Valor } from "../database/Valor";
import { Opereaciones , TipoOperacion } from "../database/Opereaciones";
import { Asignacion } from "../database/Asignacion";
import { ElementoTabla } from "../database/ElementoTabla";
import { Imprimir } from "../database/Imprimir";
import { Declaracion } from "../database/Declaracion";
import { Set } from "../database/Set";
import { Consulta } from "../database/Consulta";
import { Filtro , TipoFiltro} from "../database/Filtro";
import { InstruccionIF , InstruccionELSE, InstruccionELSEIF } from "../database/InstruccionIF";
// para mantener
import { TablaEjecucion } from "./TablaEjecucion";

export class Memoria {

  tablas:Array<TablaEjecucion> = new Array;
  private list:Array<TablaEjecucion> = [];

  cargar(realizar: Token[]) {
    if (realizar != undefined && realizar.length>0) {
      realizar.forEach(element => {
        if (element instanceof Tabla && this.insertTabla(element)) {
          this.tablas.push(new TablaEjecucion(element));
        }
        if (element instanceof ElementoTabla && this.insertElementoTabla(element)) {
          this.list[0].addElemento(element);
        } 
      });
    }
  }

  insertTabla(element:Tabla):Boolean {
    if (this.tablas.length > 0) {
       return !(this.tablas.filter(p=>p.tablas.name == element.name).length>0);
    }
    return true;
  }

  insertElementoTabla(element:ElementoTabla):Boolean {
    if (this.tablas.length > 0) {
      this.list = this.tablas.filter(p=>p.tablas.listadoAtributo.filter(p=>p.name == element.listadoAtributos[0].nombre));
      return (this.list.length>0);
    }
    return true;
  }
}

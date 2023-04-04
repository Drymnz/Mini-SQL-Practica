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

export class Memoria {

  tablas:Array<Tabla> = new Array;

  cargar(realizar: Token[]) {
    realizar.forEach(element => {
      if (element instanceof Tabla) {
        console.log(element);
      }
    });
  }

}
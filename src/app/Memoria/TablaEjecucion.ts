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
        const varlo:Boolean[] = [];
        this.tablas.listadoAtributo.forEach(element => {
            const listado = elemento.listadoAtributos.filter(p=>p.nombre == element.name);
            if (listado.length == 1) {
                const item = listado[0];

                //const valor_verificar = item.valor.run();
                //typeof(valor_verificar);
            } else {
                varlo.push(false);
            }
        });
    }
  
  }
  
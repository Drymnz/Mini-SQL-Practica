// para analizar
import { Token } from "src/app/database/Token"
import { Tabla, TipoDato } from "src/app/database/Tabla"
import { Valor } from "../database/Valor";
import { Opereaciones, TipoOperacion } from "../database/Opereaciones";
import { ElementoTabla } from "../database/ElementoTabla";
import { Imprimir } from "../database/Imprimir";
import { Declaracion } from "../database/Declaracion";
import { Set } from "../database/Set";
import { Consulta } from "../database/Consulta";
import { Filtro, TipoFiltro } from "../database/Filtro";
import { InstruccionIF, InstruccionELSE, InstruccionELSEIF } from "../database/InstruccionIF";
import { ErrorEjecucion, ErrorParser, TipoErrorEjecucion } from "./ErrorPersonal";

// para mantener
import { TablaEjecucion } from "./TablaEjecucion";
import { Variable } from "../database/Variable";

export class Memoria {

  tablas: Array<TablaEjecucion> = new Array;
  private list: Array<TablaEjecucion> = [];
  private listVariables: Array<Variable> = [];
  consultas: Array<TablaEjecucion> = new Array;
  listReport: Array<ErrorParser> = new Array; // Reportes lexicos y sintacticos 
  listSemantico: Array<ErrorEjecucion> = new Array; // Reportes semánticos

  cargar(realizar: Token[]) {
    if (realizar != undefined && realizar.length > 0) {
      this.listVariables = [];//variables solamente una ves
      this.consultas = new Array;//variables solamente una ves
      this.listReport = new Array;//variables solamente una ves
      this.listSemantico = new Array;//variables solamente una ves
      realizar.forEach(element => {
        //realizar la tablas
        if (element instanceof Tabla && this.insertTabla(element)) {
          this.tablas.push(new TablaEjecucion(element));
        }
        //realizar la insercion de elementos
        if (element instanceof ElementoTabla && this.insertElementoTabla(element)) {
          this.list[0].addElemento(element);
        }
        //Declarar variables
        if (element instanceof Declaracion) {
          this.insertarVariable(element);
        }
        //Asignar las valor a las variables
        if (element instanceof Set) {
          this.asignacionValoresVariables(element);
        }
        //Imprimir en consola
        if (element instanceof Imprimir) {
          this.imprimir(element);
        }
        //Consulta un select *
        if (element instanceof Consulta) {

        }
        //Listar los reportes de parsar
        if (element instanceof ErrorParser) {
          this.listReport.push(element);

        }
        //Consulta un select *
        if (element instanceof InstruccionIF) {
          //if
          //verifica si entro al if
          //const irThen = 
          //this.cargar(element.listaAcciones);
          //else
          if (element.cola instanceof InstruccionELSE) {
            //this.cargar(element.cola.listaAcciones);
          }
          if (element.cola instanceof InstruccionELSEIF) {
            //const irThen = 
            //const enviar = element.cola as InstruccionIF;
            //this.cargar(enviar);
          }
        }
      });
    }
  }

  insertTabla(element: Tabla): Boolean {
    if (this.limpiarTabla(element)) {
      if (this.tablas.length > 0) {
        if ((this.tablas.filter(p => p.tablas.name == element.name).length > 0)) {
          this.listSemantico.push(new ErrorEjecucion(element.line,element.column,element.name,TipoErrorEjecucion.TABLA_REPETIDA));
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    }
    return false;
  }

  limpiarTabla(element: Tabla): boolean {
    if (element.listadoAtributo instanceof ErrorParser) {
      this.listReport.push(element.listadoAtributo);
      return false;
    }
    return true;
  }

  insertElementoTabla(element: ElementoTabla): Boolean {
    if (this.tablas.length > 0 && this.limpiarElementoTabla(element)) {
      this.list = this.tablas.filter(//TablaEjecucion memoria
        p1 => p1.tablas.listadoAtributo.filter(//Tabla memoria
          p2 =>//Listado Atributo de tabla memoria
            element.listadoAtributos.filter(
              p3 => p3.nombre == p2.name // este atributo tiene el mismo nombre
            ).length == 1// tiene la misma cantidad de atributos 
        ).length == p1.tablas.listadoAtributo.length
        //Tabla
        //TablaEjecucion
      );
      return (this.list.length == 1);
    }
    return false;
  }

  limpiarElementoTabla(element: ElementoTabla): boolean {
    if (element.listadoAtributos instanceof ErrorParser) {
      this.listReport.push(element.listadoAtributos);
      return false;
    }
    return true;
  }

  insertarVariable(element: Declaracion) {
    const linea = element.line;
    const column = element.column;
    const valorVariable = element.valor;
    const tipoVariable = element.tipo;
    if (this.listVariables.length < 1) {
      element.nombre.forEach(itmString => {
        this.listVariables.push(new Variable(linea, column, itmString, tipoVariable, valorVariable));
      });
    } else {
      const ver: Declaracion = element;
      var listadoInserVariable = element.nombre.filter(p => this.listVariables.filter(p2 => p2.nombre == p).length == 0);
      if (listadoInserVariable.length > 0) {
        listadoInserVariable.forEach(itmString => {
          this.listVariables.push(new Variable(linea, column, itmString, tipoVariable, valorVariable));
        });
      }
    }
  }

  limpiarDeclaracion(element: Declaracion): boolean {
    if (element.valor instanceof ErrorParser) {
      this.listReport.push(element.valor);
      return false;
    }
    return true;
  }

  asignacionValoresVariables(element: Set) {
    if (this.listVariables.length > 0 && this.limpiarSet(element)) {
      const itimEle: Set = element;
      this.listVariables.forEach(element_uno => {
        const listAsig = itimEle.listadoAsignacion.filter(p => p.nombre == element_uno.nombre);
        listAsig.forEach(element => {
          element_uno.valor = element.getValor();
        });
      });
    }
  }

  limpiarSet(element: Set): boolean {
    if (element.listadoAsignacion instanceof ErrorParser) {
      this.listReport.push(element.listadoAsignacion);
      return false;
    }
    return true;
  }

  //para imprimir en consola la peticion de imprimir
  imprimir(element: Imprimir) {
    var imprimirTexto: String = ' ';
    if (element.listadoValores instanceof ErrorParser) {
      this.listReport.push(element.listadoValores);
    } else {
      element.listadoValores.forEach(element => {
        if (element instanceof Valor) {
          if (!(element.tipo == TipoDato.VARIABLE)) {
            imprimirTexto += element.valor + ' ';
          } else {
            imprimirTexto += this.buscarValorVariable(element.valor as String) + '';
          }
        }
        if (element instanceof Opereaciones) {
          const valorResult = element.getValue() as Valor;
          if (!(valorResult.tipo == TipoDato.VARIABLE)) {
            imprimirTexto += valorResult.valor + ' ';
          } else {
            imprimirTexto += this.buscarValorVariable(valorResult.valor as String) + '';
          }
        }
        if (element instanceof ErrorParser) {
          this.listReport.push(element);
        }
      });
      const filtroUna = imprimirTexto.split('\'').join('');
      const filtroDos = filtroUna.split('\"').join('');
      console.log(filtroDos);
    }
  }

  //buscar variable y retornar el valor de la variable de la memoria.
  buscarValorVariable(buscar: String): String | undefined {
    var variable: String | undefined;
    const list: Array<Variable> = this.listVariables.filter(p => p.nombre == buscar);
    if (list.length > 0) {
      const usar: String = list[0].getValorString();
      return usar + '';
    }
    return undefined;
  }
}

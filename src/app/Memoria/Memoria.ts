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
import { Asignacion } from "../database/Asignacion";

export class Memoria {

  tablas: Array<TablaEjecucion> = new Array;// tabla que aguarda los data base
  private list: Array<TablaEjecucion> = [];// listado que me sirvio para agregar //post se puede simplificar
  private listVariables: Array<Variable> = [];// lista de variables de ejecucion
  consultas: Array<TablaEjecucion> = new Array;// lista de consultas select 
  listReport: Array<ErrorParser> = new Array; // Reportes lexicos y sintacticos // errores en el analizes 
  listSemantico: Array<ErrorEjecucion> = new Array; // Reportes semánticos // son de ejecucion o ultima etapa de intreprete
  listSemanticoMiniSQL: Array<ErrorEjecucion> = new Array; // Reportes semánticos // son de ejecucion o ultima etapa de intreprete

  cargar(realizar: Token[]) {
    if (realizar != undefined && realizar.length > 0) {
      this.listVariables = [];//variables solamente una ves
      this.consultas = new Array;//variables solamente una ves
      this.listReport = new Array;//variables solamente una ves
      this.listSemantico = new Array;//variables solamente una ves
      this.listSemanticoMiniSQL = new Array;//variables solamente una ves
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
          this.realizarConsulta(element)
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

  private realizarConsulta(element: Consulta): void {
    if (element.listaColumna instanceof ErrorParser) {
      this.listReport.push(element.listaColumna);
    }
    if (String(element.listaColumna) === "*") {
      if (element.nombreTabla == undefined) {
        this.listSemanticoMiniSQL.push(new ErrorEjecucion(element.line, element.column, 'undefind', TipoErrorEjecucion.NO_SELECCION_TABLA));
      } else {
        const ustarTabla: TablaEjecucion | undefined = this.buscarTablaNombre(String(element.nombreTabla));
        if (ustarTabla == undefined) {
          this.listSemanticoMiniSQL.push(new ErrorEjecucion(element.line, element.column, 'undefind', TipoErrorEjecucion.NO_HAY_TABLA_CONSULTA));
        } else {
          this.aplicarFiltro(ustarTabla, element)
        }
      }
    }
    else {
      // columnas selecionadas
      for (let index = 0; index < element.listaColumna.length; index++) {
        //const element = array[index];

      }
    }
  }

  private aplicarFiltro(ustarTabla: TablaEjecucion, element: Consulta) {
    console.log(element)
    if (element.listFiltros == undefined) {
      this.consultas.push(ustarTabla);
    } else {
      if (element.listFiltros.length > 0) {
        if (element.listFiltros[0].listadoAsignacion == undefined || element.listFiltros[0].listadoAsignacion instanceof ErrorParser) {
          this.consultas.push(ustarTabla);//SELECT *  FROM person WHERE ;
        } else {
          const ustarTablaCopia: TablaEjecucion = ustarTabla;
          for (let i = 0; i < element.listFiltros.length; i++) {
            var numeroLimit = 0;
            const filtro: Filtro = element.listFiltros[i];
            switch (filtro.tipo) {
              case TipoFiltro.LIMIT:
                const nuevoListadoElmento: ElementoTabla[] = [];
                console.log(filtro.listadoAsignacion)
                if (filtro.listadoAsignacion instanceof Valor) {
                  const convertirValor: Valor = filtro.listadoAsignacion as Valor;
                  numeroLimit = Number(convertirValor.valor);
                }
                if (filtro.listadoAsignacion instanceof Opereaciones) {
                  const convertirValor: Opereaciones = filtro.listadoAsignacion as Opereaciones;
                  numeroLimit = Number(convertirValor.getValue()?.valor);
                }
                for (let j = 0; (j < ustarTablaCopia.listadoElementos.length)
                  &&
                  (j < numeroLimit)
                  ; j++) {
                  const element: ElementoTabla = ustarTablaCopia.listadoElementos[j];
                  nuevoListadoElmento.push(element);
                }
                ustarTablaCopia.listadoElementos = nuevoListadoElmento;//SELECT * FROM persona LIMIT 10;
                break;
              case TipoFiltro.OFFSET:
                const nuevoListadoElmentoOFFSET: ElementoTabla[] = [];
                console.log(filtro.listadoAsignacion)
                if (filtro.listadoAsignacion instanceof Valor) {
                  const convertirValor: Valor = filtro.listadoAsignacion as Valor;
                  numeroLimit = Number(convertirValor.valor);
                }
                if (filtro.listadoAsignacion instanceof Opereaciones) {
                  const convertirValor: Opereaciones = filtro.listadoAsignacion as Opereaciones;
                  numeroLimit = Number(convertirValor.getValue()?.valor);
                }
                for (let j = numeroLimit; (j < ustarTablaCopia.listadoElementos.length) && (j > -1); j++) {
                  const element: ElementoTabla = ustarTablaCopia.listadoElementos[j];
                  nuevoListadoElmentoOFFSET.push(element);
                }
                ustarTablaCopia.listadoElementos = nuevoListadoElmentoOFFSET;//SELECT * FROM persona LIMIT 10;
                break;
              case TipoFiltro.WHERE:
                var condicion;
                if (filtro.listadoAsignacion instanceof Valor) {
                  const convertirValor: Valor = filtro.listadoAsignacion as Valor;
                  condicion = Number(convertirValor.valor);
                }
                if (filtro.listadoAsignacion instanceof Opereaciones) {
                  const convertirValor: Opereaciones = filtro.listadoAsignacion as Opereaciones;
                  condicion = Number(convertirValor.getValue()?.valor);
                }
                /* ustarTablaCopia.listadoElementos = ustarTablaCopia.listadoElementos.filter(
                  p=> p.listadoAtributos.filter(a=> 
                    filtro.listadoAsignacion.filter(p2 => if (p2 instanceof Asignacion) {
                      
                    })
                    )
                  ); */
                break;
              default:
                break;
            }
            if (numeroLimit < 0) {
              this.listSemanticoMiniSQL.push(new ErrorEjecucion(filtro.line, filtro.column, 'undefind', TipoErrorEjecucion.MENOR_0));
            }
          }
          this.consultas.push(ustarTablaCopia);//despues de utilizar los filtros;
        }
      } else {
        this.consultas.push(ustarTabla);//SELECT *  FROM person ;
      }
    }
  }


  private insertTabla(element: Tabla): Boolean {
    if (this.limpiarTabla(element)) {
      if (this.tablas.length > 0) {
        if ((this.tablas.filter(p => p.tablas.name == element.name).length > 0)) {
          this.listSemantico.push(new ErrorEjecucion(element.line, element.column, element.name, TipoErrorEjecucion.TABLA_REPETIDA));
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

  private limpiarTabla(element: Tabla): boolean {
    if (element.listadoAtributo instanceof ErrorParser) {
      this.listReport.push(element.listadoAtributo);
      return false;
    }
    return true;
  }

  private insertElementoTabla(element: ElementoTabla): Boolean {
    if (this.tablas.length > 0 && this.limpiarElementoTabla(element)) {
      this.list = this.tablas.filter(//TablaEjecucion memoria
        p1 => p1.tablas.listadoAtributo.filter(//Tabla memoria
          p2 =>//Listado Atributo de tabla memoria
            element.listadoAtributos.filter(
              p3 => (p3.nombre == p2.name)  // este atributo tiene el mismo nombre
            ).length == 1// tiene la misma cantidad de atributos 
        ).length == p1.tablas.listadoAtributo.length
        //Tabla
      );
      if ((this.list.length == 1)) {//TablaEjecucion
        //asignar esta tabla para recorer
        const usarTabla: TablaEjecucion = this.list[0];
        //recorer los elementos de tabla
        const listadoElementosrecorer: ElementoTabla[] = usarTabla.listadoElementos;
        if (listadoElementosrecorer.length > 0) {
          //vamos a filtrar los elementos repetidos
          const listadoElementosrecorerRepetidos: ElementoTabla[] = listadoElementosrecorer.filter(
            p => p.listadoAtributos.filter(
              l =>
                element.listadoAtributos.filter(
                  p3 => (p3.getValor().valor == l.getValor().valor)  // este atributo tiene el mismo nombre
                ).length == 1
            ).length == p.listadoAtributos.length
          );
          if (listadoElementosrecorerRepetidos.length == 0) {
            return true;
          } else {
            this.listSemantico.push(new ErrorEjecucion(element.line, element.column, "elemento tabla", TipoErrorEjecucion.ELEMENTO_REPETIDO));
            return false;
          }
        }
        return true;
      } else {
        this.listSemantico.push(new ErrorEjecucion(element.line, element.column, "elemento tabla", TipoErrorEjecucion.NO_EXITE_TABLA_DONDE_COLOCAR));
        return false;
      }
    } else {
      this.listSemantico.push(new ErrorEjecucion(element.line, element.column, "vacio", TipoErrorEjecucion.NO_HAY_TABLAS));
      return false;
    }
  }

  private limpiarElementoTabla(element: ElementoTabla): boolean {
    if (element.listadoAtributos instanceof ErrorParser) {
      this.listReport.push(element.listadoAtributos);
      return false;
    }
    return true;
  }

  private insertarVariable(element: Declaracion) {
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

  private limpiarDeclaracion(element: Declaracion): boolean {
    if (element.valor instanceof ErrorParser) {
      this.listReport.push(element.valor);
      return false;
    }
    return true;
  }

  private asignacionValoresVariables(element: Set) {
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

  private limpiarSet(element: Set): boolean {
    if (element.listadoAsignacion instanceof ErrorParser) {
      this.listReport.push(element.listadoAsignacion);
      return false;
    }
    return true;
  }

  //para imprimir en consola la peticion de imprimir
  private imprimir(element: Imprimir) {
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
  private buscarValorVariable(buscar: String): String | undefined {
    var variable: String | undefined;
    const list: Array<Variable> = this.listVariables.filter(p => p.nombre == buscar);
    if (list.length > 0) {
      const usar: String = list[0].getValorString();
      return usar + '';
    }
    return undefined;
  }
  private buscarTablaNombre(buscar: String): TablaEjecucion | undefined {
    if (this.tablas.length > 0) {
      const listTablas: Array<TablaEjecucion> = this.tablas.filter(p => p.tablas.name == buscar);
      if (listTablas.length > 0) {
        return listTablas[0]
      } else {
        return undefined;
      }
    }
    return undefined;
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ErrorEjecucion, ErrorParser, TipoErrorEjecucion, TipoErrorParser } from 'src/app/Memoria/ErrorPersonal';
import { TablaEjecucion } from 'src/app/Memoria/TablaEjecucion';
import { ElemtentoTablaView, TablaView } from 'src/app/interface/tabla-view';


@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-tabla-memoria',
  templateUrl: './tabla-memoria.component.html',
  styleUrls: ['./tabla-memoria.component.css']
})

export class TablaMemoriaComponent {

  mostrarTablaView: TablaView[] = [];
  private tablas: Array<TablaEjecucion> = [];

  constructor() {

  }

  cargarTablas(tablas: Array<TablaEjecucion>) {
    if (tablas != undefined && tablas.length > 0) {
      this.tablas = tablas;
      this.trasformarcion();
    }
  }

  private trasformarcion(): void {
    for (let i = 0; this.tablas.length > i; i++) {
      const nombreInser: String = this.tablas[i].tablas.name;
      const listadoAtributos: String[] = this.tablas[i].tablas.getListadoNombreAtriguto();
      const listadoElementos: ElemtentoTablaView[] = [];
      for (let index = 0; index < this.tablas[i].listadoElementos.length; index++) {
        const elementoInsert: ElemtentoTablaView = { listadoDatos: this.tablas[i].listadoElementos[index].getListadoValores() };
        listadoElementos.push(elementoInsert);
      }
      const crearTablaVied: TablaView = { nombre: nombreInser, columnas: listadoAtributos, listadoElementos: listadoElementos };
      this.mostrarTablaView.push(crearTablaVied);
    }
  }

  cargarReportesLS(listReport: Array<ErrorParser>) {
    if (listReport != undefined && listReport.length > 0) {
      const nombreTabla: String = "Reportes lexicos y sintacticos";
      const listadoAtributos: String[] = [
        "Linea",
        "Columna",
        "Lexema",
        "Tipo"
      ];
      const listadoElementos: ElemtentoTablaView[] = [];
      for (let index = 0; index < listReport.length; index++) {
        const tipo: String = this.stringTipoErrorParser(listReport[index].tipo);
        const elementoInsert: ElemtentoTablaView = {
          listadoDatos: [
            String(listReport[index].line),
            String(listReport[index].column),
            String(listReport[index].lexema),
            tipo
          ]
        };
        listadoElementos.push(elementoInsert);
      }
      const crearTablaVied: TablaView = {
        nombre: nombreTabla,
        columnas: listadoAtributos,
        listadoElementos: listadoElementos
      };
      this.mostrarTablaView.push(crearTablaVied);
    }
  }

  private stringTipoErrorParser(tipo: TipoErrorParser): String {
    switch (tipo) {
      case TipoErrorParser.PUNTO_COMA:
        return this.faltanteStringGramatica("PUNTO_COMA");
      case TipoErrorParser.FROM:
        return this.faltanteStringGramatica("FROM");
      case TipoErrorParser.MISSING_TABLE_ATTRIBUTE:
        return this.faltanteStringGramatica("Atributos en la tabla");
      case TipoErrorParser.MISS_COL:
        return this.faltanteStringGramatica("Indicar las columnas");
      case TipoErrorParser.MISS_DATA:
        return this.faltanteStringGramatica("Dato");
      case TipoErrorParser.MISS_TYPE_ATTRIBUTE:
        return this.faltanteStringGramatica("Tipo de atributo");
      case TipoErrorParser.THEN:
        return this.faltanteStringGramatica("THEN");
      case TipoErrorParser.INVALID:
        return "No pertenece al alfabeto";

      default:
        return "";
    }
  }

  private faltanteStringGramatica(faltante: String): String {
    return "Falto un " + faltante + " en la gramatica";
  }

  cargarReportesSemantico(listSemantico: Array<ErrorEjecucion>) {
    if (listSemantico != undefined && listSemantico.length > 0) {
      const nombreTabla: String = "Reportes lexicos y sintacticos";
      const listadoAtributos: String[] = [
        "Linea",
        "Columna",
        "Lexema",
        "Tipo"
      ];
      const listadoElementos: ElemtentoTablaView[] = [];
      for (let index = 0; index < listSemantico.length; index++) {
        const tipo: String = this.stringTipoErrorEjecucion(listSemantico[index].tipo);
        const elementoInsert: ElemtentoTablaView = {
          listadoDatos: [
            String(listSemantico[index].line),
            String(listSemantico[index].column),
            String(listSemantico[index].lexema),
            tipo
          ]
        };
        listadoElementos.push(elementoInsert);
      }
      const crearTablaVied: TablaView = {
        nombre: nombreTabla,
        columnas: listadoAtributos,
        listadoElementos: listadoElementos
      };
      this.mostrarTablaView.push(crearTablaVied);
    }
  }

  stringTipoErrorEjecucion(tipo: TipoErrorEjecucion): String {
    switch (tipo) {
      case TipoErrorEjecucion.TABLA_REPETIDA:
        return "Tabla repetida";
      case TipoErrorEjecucion.NO_EXITE_TABLA_DONDE_COLOCAR:
        return "No cumple con una registro tabla";
      case TipoErrorEjecucion.NO_HAY_TABLAS:
        return "No hay tablas para colocar";
      case TipoErrorEjecucion.ELEMENTO_REPETIDO:
        return " Ya existe este elemento";
      default:
        return "";
    }
  }
}

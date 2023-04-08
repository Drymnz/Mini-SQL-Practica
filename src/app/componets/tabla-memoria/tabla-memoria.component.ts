import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ErrorParser, TipoErrorParser } from 'src/app/Memoria/ErrorPersonal';
import { TablaEjecucion } from 'src/app/Memoria/TablaEjecucion';
import { ElemtentoTablaView, TablaView } from 'src/app/interface/tabla-view';


@Component({
  standalone:true,
  imports:[CommonModule],
  selector: 'app-tabla-memoria',
  templateUrl: './tabla-memoria.component.html',
  styleUrls: ['./tabla-memoria.component.css']
})

export class TablaMemoriaComponent {

  mostrarTablaView:TablaView[] = [];
  private tablas: Array<TablaEjecucion> = [];

  constructor(){

  }

  cargarTablas(tablas: Array<TablaEjecucion>){
    this.tablas = tablas;
    this.trasformarcion();
  }

  private trasformarcion(): void {
    for (let i = 0; this.tablas.length > i; i++) {
      const nombreInser:String = this.tablas[i].tablas.name;
      const listadoAtributos:String[] = this.tablas[i].tablas.getListadoNombreAtriguto();
      const listadoElementos:ElemtentoTablaView[] = [];
      for (let index = 0; index < this.tablas[i].listadoElementos.length; index++) {
        const elementoInsert:ElemtentoTablaView = {listadoDatos:this.tablas[i].listadoElementos[index].getListadoValores()};
        listadoElementos.push(elementoInsert);
      }
      const crearTablaVied:TablaView = {nombre:nombreInser,columnas:listadoAtributos,listadoElementos:listadoElementos};
      this.mostrarTablaView.push(crearTablaVied);
    }
  }

  cargarReportesLS(listReport: Array<ErrorParser> ){
    const nombreTabla:String = "Reportes lexicos y sintacticos";
    const listadoAtributos:String[] = [
      "Linea" , 
      "Columna" , 
      "Lexema"  , 
      "Tipo"
    ];
    const listadoElementos:ElemtentoTablaView[] = [];
    for (let index = 0; index < listReport.length; index++) {
      const tipo:String = this.stringTipoErrorParser(listReport[index].tipo);
        const elementoInsert:ElemtentoTablaView = {
          listadoDatos:[
            String(listReport[index].line),
            String(listReport[index].column),
            String(listReport[index].lexema),
            tipo
          ]
        };
        listadoElementos.push(elementoInsert);
    }
    const crearTablaVied:TablaView = {
      nombre:nombreTabla,
      columnas:listadoAtributos,
      listadoElementos:listadoElementos
    };
    this.mostrarTablaView.push(crearTablaVied);
  }

  stringTipoErrorParser(tipo:TipoErrorParser):String{
    switch (tipo) {
      case TipoErrorParser.PUNTO_COMA:
        return "";
      default:
        return "";
    }
  }

}

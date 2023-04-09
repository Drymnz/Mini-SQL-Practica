import { Component, EventEmitter, ViewChild, Output , ComponentFactoryResolver, ComponentRef} from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { CodeModel } from '@ngstack/code-editor';
import { Parser } from "src/app/analyzer/parser";
import { Memoria } from 'src/app/Memoria/Memoria';
import { MemoriaGlobalService } from 'src/app/servicio/memoria-global.service';
import { DinamicoTablaMemoriaDirective } from 'src/app/directive/dinamico-tabla-memoria.directive';
import { TablaMemoriaComponent } from '../tabla-memoria/tabla-memoria.component';
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent{

  mostrarReportesErrorLexicoSintacticos:Boolean = false;
  mostrarReportesSemanticos:Boolean = false;
  mostrarMemoria:Boolean = false;
  mostrarConsulta:Boolean = false;
  mostrarReportesSemanticosMiniSQL:Boolean = false;
  
  theme = 'hc-black';
  codeModel: CodeModel = {
    language: 'sql',
    uri: 'main.sql',
    value: ''
  };
  
  options = {
    contextmenu: true,
    minimap: {
      enabled: false
    },
    FontSize:32
  };
  memoria:Memoria = new Memoria();

  @ViewChild(DinamicoTablaMemoriaDirective)
   listadoTablas!:DinamicoTablaMemoriaDirective;

  constructor
  (
    private router: Router, private activatedRoute: ActivatedRoute,
    private usarMemoria:MemoriaGlobalService,
    private addComponet:ComponentFactoryResolver
  ) 
  {
  }
  
  vista(){
    try {
      const parser = new Parser(this.codeModel.value);
      parser.parse();
      const resultadoAnalize = parser.getRealizar();
      this.memoria.cargar(resultadoAnalize);
      //console.log(resultadoAnalize)
      //console.log(this.memoria)
      this.mostrarMemoria = (this.memoria.tablas!=undefined) && (this.memoria.tablas.length > 0); 
      this.mostrarConsulta = (this.memoria.tablas!=undefined) && (this.memoria.consultas.length > 0); 
      this.mostrarReportesErrorLexicoSintacticos = (this.memoria.tablas!=undefined) &&(this.memoria.listReport.length > 0); 
      this.mostrarReportesSemanticos = (this.memoria.tablas!=undefined) &&(this.memoria.listSemantico.length > 0); 
      this.mostrarReportesSemanticosMiniSQL = (this.memoria.tablas!=undefined) &&(this.memoria.listSemanticoMiniSQL.length > 0); 
    } catch (error) {
      console.log(error);
    }
  }
  
  irMemoria(){
    this.usarIr().instance.cargarTablas(this.memoria.tablas);
  }

  irReportesLS(){
    this.usarIr().instance.cargarReportesLS(this.memoria.listReport);
  }

  irReportesDB(){
    this.usarIr().instance.cargarReportesSemantico(this.memoria.listSemantico);
  }

  irReportesMiniSQL(){
    this.usarIr().instance.cargarReportesSemantico(this.memoria.listSemanticoMiniSQL);
  }
irConsulta(){
  this.usarIr().instance.cargarTablas(this.memoria.consultas);
}
  private usarIr():ComponentRef<TablaMemoriaComponent>{
    const agregarComponete = this.addComponet.resolveComponentFactory(TablaMemoriaComponent);
    this.listadoTablas?.viewcontainerref.clear()
    return this.listadoTablas?.viewcontainerref.createComponent(agregarComponete);
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TablaEjecucion } from 'src/app/Memoria/TablaEjecucion';
import { TablaView } from 'src/app/interface/tabla-view';


@Component({
  standalone:true,
  imports:[CommonModule],
  selector: 'app-tabla-memoria',
  templateUrl: './tabla-memoria.component.html',
  styleUrls: ['./tabla-memoria.component.css']
})

export class TablaMemoriaComponent {

  mostrarTablaView:TablaView[] = [];
  tablas: Array<TablaEjecucion> = [];

  constructor(){

  }

  cargarTablas(tablas: Array<TablaEjecucion>){
    this.tablas = tablas;
    this.trasformarcion();
  }

  private trasformarcion(): void {
    for (let i = 0; this.tablas.length > i; i++) {
      const nombreInser:String = this.tablas[i].tablas.name;
      const crearTablaVied:TablaView = {nombre:nombreInser};
      this.mostrarTablaView.push(crearTablaVied);
    }
  }

}

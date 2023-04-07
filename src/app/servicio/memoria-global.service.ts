import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Memoria } from '../Memoria/Memoria';
import { TablaEjecucion } from '../Memoria/TablaEjecucion';

@Injectable({
  providedIn: 'root'
})
export class MemoriaGlobalService {

  private memoria:Memoria = new Memoria();
  private MemoriaUsar$:Subject<Memoria>;

  constructor(){
      this.MemoriaUsar$ = new Subject<Memoria>();
  }

  nuevaMemoria(memoria:Memoria){
    this.memoria = memoria;
    this.MemoriaUsar$.next(memoria);
    console.log(this.memoria)
  }
  nuevaTabla(tablas:TablaEjecucion){
  }

  obtenerMemoria$():Observable<Memoria>{
    return this.MemoriaUsar$.asObservable();
  }
}

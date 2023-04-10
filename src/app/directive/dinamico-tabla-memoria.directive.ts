import { Directive , ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDinamicoTablaMemoria]'
})
export class DinamicoTablaMemoriaDirective {

  constructor(public viewcontainerref:ViewContainerRef) { }

}

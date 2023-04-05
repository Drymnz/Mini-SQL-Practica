import { Token } from "src/app/database/Token" 
import { Valor } from "./Valor";
import { Opereaciones } from "./Opereaciones";

export class Asignacion extends Token{

    nombre: any;
    private valor:Token | undefined;

    constructor(
        line: number,
        column: number,
        nombre: any,
        valor:Token | undefined
      ) {
        super(line, column);
        this.nombre = nombre ;
        this.valor = valor;
      }

     getValor()   {
      if(this.valor instanceof Valor){
        this.valor;
      }else{
        if (this.valor instanceof Opereaciones) {
          const convertir:Opereaciones = this.valor;
          this.valor = convertir.getValue();
        }
      }
    }
}
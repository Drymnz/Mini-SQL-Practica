import { Token } from "src/app/database/Token" 
import { Valor } from "./Valor";
import { Opereaciones } from "./Opereaciones";

export class Asignacion extends Token{

    nombre: any;
    private valor:Token | Valor | undefined;

    constructor(
        line: number,
        column: number,
        nombre: any,
        valor:Token | Valor | undefined
      ) {
        super(line, column);
        this.nombre = nombre ;
        this.valor = valor;
      }

     getValor():Valor{
      if(this.valor instanceof Valor){
        return this.valor;
      }else{
        if (this.valor instanceof Opereaciones) {
          const convertir:Opereaciones = this.valor as Opereaciones;
          this.valor = convertir.getValue();
        }
        return this.valor as Valor;
      }
    }
}
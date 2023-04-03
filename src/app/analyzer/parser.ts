//import { Assignment } from "src/app/model/assignment";
import { Token } from "src/app/database/Token"
import { Tabla,Atributo,TipoDato } from "src/app/database/Tabla"


declare var analizar: any;

export class Parser {
  private realizar: Token[] = [];
  private source: string;

  constructor(source: string) {
    this.source = source;
    //analizar.yy.Assignment = Assignment;
    //crear tabla
    analizar.yy.Tabla = Tabla;
    analizar.yy.Atributo = Atributo;
    analizar.yy.TipoDato = TipoDato;
    //crear tabla
    
  }

  parse() {
    try {
      this.realizar = analizar.parse(this.source);
      console.log(this.realizar);
    } catch(error) {
      console.error(error);
    }
  }
}
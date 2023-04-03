//import { Assignment } from "src/app/model/assignment";
import { Token } from "src/app/database/Token"
import { Tabla,Atributo,TipoDato } from "src/app/database/Tabla"
import { Valor } from "../database/Valor";
import { Opereaciones , TipoOperacion } from "../database/Opereaciones";
import { Asignacion } from "../database/Asignacion";
import { ElementoTabla } from "../database/ElementoTabla";
import { Imprimir } from "../database/Imprimir";

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
    //crear Elemento tabla
    analizar.yy.Valor = Valor ;
    analizar.yy.Opereaciones = Opereaciones;
    analizar.yy.TipoOperacion = TipoOperacion;
    analizar.yy.Asignacion = Asignacion;
    analizar.yy.ElementoTabla = ElementoTabla;
    //Imprimir
    analizar.yy.Imprimir = Imprimir;
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
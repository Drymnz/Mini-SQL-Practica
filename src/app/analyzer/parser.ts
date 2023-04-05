import { Token } from "src/app/database/Token"
import { Tabla,Atributo,TipoDato } from "src/app/database/Tabla"
import { Valor } from "../database/Valor";
import { Opereaciones , TipoOperacion } from "../database/Opereaciones";
import { Asignacion } from "../database/Asignacion";
import { ElementoTabla } from "../database/ElementoTabla";
import { Imprimir } from "../database/Imprimir";
import { Declaracion } from "../database/Declaracion";
import { Set } from "../database/Set";
import { Consulta } from "../database/Consulta";
import { Filtro , TipoFiltro} from "../database/Filtro";
import { InstruccionIF , InstruccionELSE, InstruccionELSEIF } from "../database/InstruccionIF";
import { ErrorParser , TipoErrorParser } from "../Memoria/ErrorPersonal";

declare var analizar: any;

export class Parser {
  private realizar: Token[] = [];
  private source: string;

  constructor(source: string) {
    this.source = source;
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
    //Declaracion
    analizar.yy.Declaracion = Declaracion;
    // ASIGNAR 
    analizar.yy.Set = Set;
    //Imprimir
    analizar.yy.Imprimir = Imprimir;    
    // Consulta 
    analizar.yy.Consulta = Consulta;
    // Filtro 
    analizar.yy.Filtro = Filtro;
    analizar.yy.TipoFiltro = TipoFiltro;
    // InstruccionIF 
    analizar.yy.InstruccionIF = InstruccionIF;   
    analizar.yy.InstruccionELSE = InstruccionELSE;    
    analizar.yy.InstruccionELSEIF = InstruccionELSEIF;   
    // Error 
    analizar.yy.ErrorParser = ErrorParser;    
    analizar.yy.TipoErrorParser = TipoErrorParser;    
  }

  parse() {
    try {
      this.realizar = analizar.parse(this.source);
      //console.log(this.realizar);
    } catch(error) {
      console.error(error);
    }
  }

  getRealizar() : Token[]{
    return this.realizar;
  }
}
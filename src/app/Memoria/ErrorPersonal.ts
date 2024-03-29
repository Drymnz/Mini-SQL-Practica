import { Token } from "src/app/database/Token" 

export class ErrorParser extends Token{

    tipo: TipoErrorParser;
    lexema:String | undefined;

    constructor(
        line: number,
        column: number,
        tipo: TipoErrorParser,
        lexema:String | undefined
      ) {
        super(line, column);
        this.tipo = tipo ;
        this.lexema = lexema;
      }

}
export enum TipoErrorParser {
    PUNTO_COMA,
    FROM,
    THEN,
    MISS_DATA,
    MISS_COL,
    MISSING_TABLE_ATTRIBUTE,
    MISS_TYPE_ATTRIBUTE, 
    INVALID
}

export class ErrorEjecucion extends Token{

  tipo: TipoErrorEjecucion;
  lexema:String | undefined;

  constructor(
      line: number,
      column: number,
      lexema:String | undefined,
      tipo: TipoErrorEjecucion
    ) {
      super(line, column);
      this.tipo = tipo ;
      this.lexema = lexema;
    }

}
export enum TipoErrorEjecucion {
  TABLA_REPETIDA,
  NO_EXITE_TABLA_DONDE_COLOCAR,
  NO_HAY_TABLAS,
  NO_HAY_TABLA_CONSULTA,
  ELEMENTO_REPETIDO,
  NO_SELECCION_TABLA,
  MENOR_0,
  VARIABLE_NO_EXISTE,
  COLUMNA_NO_EXISTENTE
}
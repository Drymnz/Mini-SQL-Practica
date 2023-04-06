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

  constructor(
      line: number,
      column: number,
      tipo: TipoErrorEjecucion
    ) {
      super(line, column);
      this.tipo = tipo ;
    }

}
export enum TipoErrorEjecucion {
  INVALID
}
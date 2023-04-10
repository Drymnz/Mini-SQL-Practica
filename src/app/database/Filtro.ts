import { Token } from "src/app/database/Token" 

export class Filtro extends Token{

  listadoAsignacion: Token[] = [];
  tipo:TipoFiltro | undefined;

    constructor(
        line: number,
        column: number,
        tipo:TipoFiltro | undefined,
        listadoAsignacion: Token[] = []
      ) {
        super(line, column);
        this.listadoAsignacion = listadoAsignacion;
        this.tipo = tipo;
      }
}

export enum TipoFiltro {
  WHERE,
  LIMIT,
  OFFSET
}
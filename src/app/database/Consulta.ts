import { Token } from "src/app/database/Token" 
import { Asignacion } from "./Asignacion";

export class Consulta extends Token{

    listaColumna: [];
    nombreTabla:String | undefined;
    listFiltros : Token[] = [];

    constructor(
        line: number,
        column: number,
        listaColumna: [],
        nombreTabla:String | undefined,
        listFiltros : Token[] = []
      ) {
        super(line, column);
        this.nombreTabla = nombreTabla;
        this.listaColumna = listaColumna;
        this.listFiltros = listFiltros;
      }

}
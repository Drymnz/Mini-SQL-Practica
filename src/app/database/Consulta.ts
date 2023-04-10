import { Token } from "src/app/database/Token" 
import { Asignacion } from "./Asignacion";
import { Filtro } from "./Filtro";

export class Consulta extends Token{

    listaColumna: [];
    nombreTabla:String | undefined;
    listFiltros : Filtro[] = [];

    constructor(
        line: number,
        column: number,
        listaColumna: [],
        nombreTabla:String | undefined,
        listFiltros : Filtro[] = []
      ) {
        super(line, column);
        this.nombreTabla = nombreTabla;
        this.listaColumna = listaColumna;
        this.listFiltros = listFiltros;
      }

}
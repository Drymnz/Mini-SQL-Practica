import { Token } from "src/app/database/Token" 

export class InstruccionIF extends Token{

    condicion: Token[] = [];
    listaAcciones: Token[] = [];
    cola: Token[] = [];

    constructor(
        line: number,
        column: number,
        condicion: Token[] = [],
        listaAcciones: Token[] = [],
        cola: Token[] = []
      ) {
        super(line, column);
        this.condicion = condicion;
        this.listaAcciones = listaAcciones;
        this.cola = cola;
      }

}

export class InstruccionELSEIF extends InstruccionIF{

    constructor(
        line: number,
        column: number,
        condicion: Token[] = [],
        listaAcciones: Token[] = [],
        cola: Token[] = []
      ) {
        super(line, column, condicion,listaAcciones,cola );
      }

}


export class InstruccionELSE extends Token{

    listaAcciones: Token[] = [];

    constructor(
        line: number,
        column: number,
        listaAcciones: Token[] = [],
      ) {
        super(line, column);
        this.listaAcciones = listaAcciones;
      }

}
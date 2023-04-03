import { Token } from "src/app/database/Token" 
export  class Tabla extends Token{
    name: any;

    constructor(
        line: number,
        column: number,
        name: any,
      ) {
        super(line, column);
        this.name = name ;
      }
    
}
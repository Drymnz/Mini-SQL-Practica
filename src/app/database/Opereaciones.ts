import { Token } from "src/app/database/Token" 
import { TipoDato } from "./Tabla";
import { Valor } from "./Valor";

export class Opereaciones extends Token{

    tipo:TipoOperacion;
    derechaDato:Opereaciones | Valor;
    izquierdaDato:Opereaciones | Valor;
    private valorFinal:Valor | undefined;

    constructor(
        line: number,
        column: number,
        tipo:TipoOperacion,
        izquierdaDato:Opereaciones | Valor,
        derechaDato:Opereaciones | Valor
      ) {
        super(line, column);
        this.tipo = tipo ;
        this.derechaDato = derechaDato;
        this.izquierdaDato = izquierdaDato;
      }
      
      getValue(): Valor | undefined {
        if (this.valorFinal == undefined) {
          var retornarValorUno:Valor | undefined;
          var retornarValorDos:Valor | undefined;
          if (this.izquierdaDato instanceof Valor) {
            retornarValorUno = this.izquierdaDato;
          } else {
            const convert = this.izquierdaDato as Opereaciones;
            retornarValorUno = convert.getValue();
          }
          if (this.derechaDato instanceof Valor) {
            retornarValorDos = this.derechaDato;
          } else {
            const convert = this.derechaDato as Opereaciones;
            retornarValorDos = convert.getValue();
          }
          this.valorFinal = this.operar(retornarValorUno,retornarValorDos);
        } else {
          return this.valorFinal;
        }
      }

      private operar(izquierdaDato: Valor | undefined,derechaDato:Valor | undefined) : Valor | undefined
      {
        if (izquierdaDato!=undefined && derechaDato!=undefined) {
          switch (this.tipo) {
            case TipoOperacion.SUMA:
              const valor = izquierdaDato.valor + derechaDato.valor;
              return new Valor(this.line,this.column,valor,this.condicion(izquierdaDato.tipo,derechaDato.tipo));
            default:
              break;
          }
        } 
        return undefined;
      }

      condicion(izquierdaDato:TipoDato,derechaDato:TipoDato):TipoDato {
        if (izquierdaDato==TipoDato.DECIMAL && derechaDato==TipoDato.DECIMAL ) {
          return TipoDato.DECIMAL;
        } 
        return TipoDato.DECIMAL;
      }
}

export enum TipoOperacion {
    NEGACION,
    AND,
    OR,
    NO_IGUAL,
    MAYOR_IGUAL,
    MAYOR,
    MENOR_IGUAL,
    MENOR,
    IGUAL,
    NEGATIVO,
    DIVISION,
    MULTIPLICACION,
    RESTA,
    SUMA,
}
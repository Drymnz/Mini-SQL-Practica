import { Token } from "src/app/database/Token"
import { TipoDato } from "./Tabla";
import { Valor } from "./Valor";

export class Opereaciones extends Token {

  tipo: TipoOperacion;
  derechaDato: Opereaciones | Valor;
  izquierdaDato: Opereaciones | Valor;
  private valorFinal: Valor | undefined;

  constructor(
    line: number,
    column: number,
    tipo: TipoOperacion,
    izquierdaDato: Opereaciones | Valor,
    derechaDato: Opereaciones | Valor
  ) {
    super(line, column);
    this.tipo = tipo;
    this.derechaDato = derechaDato;
    this.izquierdaDato = izquierdaDato;
  }

  getValue(): Valor | undefined {
    if (this.valorFinal == undefined) {
      var retornarValorUno: Valor | undefined;
      var retornarValorDos: Valor | undefined;
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
      this.valorFinal = this.operar(retornarValorUno, retornarValorDos);
      return this.valorFinal;
    }
    return this.valorFinal;
  }

  private operar(izquierdaDato: Valor | undefined, derechaDato: Valor | undefined): Valor | undefined {
    if (izquierdaDato != undefined && derechaDato != undefined) {
      var valor;
      switch (this.tipo) {
        // num + num
        case TipoOperacion.SUMA:
          valor = Number(izquierdaDato.valor) + Number(derechaDato.valor);
          return new Valor(this.line, this.column, valor, this.condicion(izquierdaDato.tipo, derechaDato.tipo));
          // num - num
        case TipoOperacion.RESTA:
          valor = Number(izquierdaDato.valor) - Number(derechaDato.valor);
          return new Valor(this.line, this.column, valor, this.condicion(izquierdaDato.tipo, derechaDato.tipo));
          // num / num
        case TipoOperacion.DIVISION:
          const dividiendor = Number(derechaDato.valor)
          if (dividiendor != 0) {
            valor = Number(izquierdaDato.valor) / dividiendor;
            return new Valor(this.line, this.column, valor, this.condicion(izquierdaDato.tipo, derechaDato.tipo));
          } else {
            return new Valor(this.line, this.column, 0, this.condicion(izquierdaDato.tipo, derechaDato.tipo));
          }
          // num * num
        case TipoOperacion.MULTIPLICACION:
          valor = Number(izquierdaDato.valor) * Number(derechaDato.valor);
          return new Valor(this.line, this.column, valor, this.condicion(izquierdaDato.tipo, derechaDato.tipo));
          // - num
        case TipoOperacion.NEGATIVO:
          valor = - Number(derechaDato.valor);
          return new Valor(this.line, this.column, valor, this.condicion(derechaDato.tipo, derechaDato.tipo));
        default:
          break;
      }
    }
    return undefined;
  }

  condicion(izquierdaDato: TipoDato, derechaDato: TipoDato): TipoDato {
    switch (this.tipo) {
      case TipoOperacion.SUMA: case TipoOperacion.RESTA: case TipoOperacion.MULTIPLICACION:
        if (izquierdaDato == TipoDato.INT && derechaDato == TipoDato.INT) {
          return TipoDato.INT;
        }
        if (izquierdaDato == TipoDato.DECIMAL && derechaDato == TipoDato.DECIMAL) {
          return TipoDato.DECIMAL;
        }
        if ((izquierdaDato == TipoDato.STRING && derechaDato == TipoDato.STRING) && this.tipo==TipoOperacion.SUMA) {
          return TipoDato.STRING;
        }
        break;
      case TipoOperacion.DIVISION:
        if (
          (izquierdaDato == TipoDato.INT
            && derechaDato == TipoDato.INT) ||
          (izquierdaDato == TipoDato.DECIMAL
            && derechaDato == TipoDato.INT) ||
          (izquierdaDato == TipoDato.DECIMAL
            && derechaDato == TipoDato.DECIMAL)
          ||
          (izquierdaDato == TipoDato.INT
            && derechaDato == TipoDato.DECIMAL)
        ) {
          return TipoDato.DECIMAL;
        }
        break;
      case TipoOperacion.NEGACION:
        return derechaDato;
      default:
        break;
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
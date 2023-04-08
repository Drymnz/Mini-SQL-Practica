import { Token } from "src/app/database/Token"
import { TipoDato } from "./Tabla";
import { Valor } from "./Valor";

export class Opereaciones extends Token {

  tipo: TipoOperacion;
  private derechaDato: Opereaciones | Valor;
  private izquierdaDato: Opereaciones | Valor;
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
      const tipoValor: TipoDato = this.condicion(izquierdaDato.tipo, derechaDato.tipo);
      var valor;
      switch (this.tipo) {
        // num + num
        case TipoOperacion.SUMA:
          valor = Number(izquierdaDato.valor) + Number(derechaDato.valor);
          return new Valor(this.line, this.column, this.convercionValorToTipo(valor, tipoValor), tipoValor);
        // num - num
        case TipoOperacion.RESTA:
          valor = Number(izquierdaDato.valor) - Number(derechaDato.valor);
          return new Valor(this.line, this.column, this.convercionValorToTipo(valor, tipoValor), tipoValor);
        // num / num
        case TipoOperacion.DIVISION:
          const dividiendor = Number(derechaDato.valor)
          if (dividiendor != 0) {
            valor = Number(izquierdaDato.valor) / dividiendor;
            return new Valor(this.line, this.column, this.convercionValorToTipo(valor, tipoValor), tipoValor);
          } else {
            return new Valor(this.line, this.column, 0, tipoValor);
          }
        // num * num
        case TipoOperacion.MULTIPLICACION:
          valor = Number(izquierdaDato.valor) * Number(derechaDato.valor);
          return new Valor(this.line, this.column, this.convercionValorToTipo(valor, tipoValor), tipoValor);
        // - num
        case TipoOperacion.NEGATIVO:
          valor = - Number(derechaDato.valor);
          return new Valor(this.line, this.column, this.convercionValorToTipo(valor, tipoValor), tipoValor);
        // valor && valor
        case TipoOperacion.AND:
          valor = izquierdaDato.valor && derechaDato.valor;
          return new Valor(this.line, this.column, this.convercionValorToTipo(valor, tipoValor), tipoValor);
        // valor && valor
        case TipoOperacion.IGUAL:
          valor = izquierdaDato.valor && derechaDato.valor;
          return new Valor(this.line, this.column, this.convercionValorToTipo(valor, tipoValor), tipoValor);
        // valor > valor
        case TipoOperacion.MAYOR:
          valor = izquierdaDato.valor > derechaDato.valor;
          return new Valor(this.line, this.column, this.convercionValorToTipo(valor, tipoValor), tipoValor);
        // valor < valor
        case TipoOperacion.MENOR:
          valor = izquierdaDato.valor < derechaDato.valor;
          return new Valor(this.line, this.column, this.convercionValorToTipo(valor, tipoValor), tipoValor);
        // valor >= valor
        case TipoOperacion.MAYOR_IGUAL:
          valor = izquierdaDato.valor >= derechaDato.valor;
          return new Valor(this.line, this.column, this.convercionValorToTipo(valor, tipoValor), tipoValor);
        // valor <= valor
        case TipoOperacion.MENOR_IGUAL:
          valor = izquierdaDato.valor <= derechaDato.valor;
          return new Valor(this.line, this.column, this.convercionValorToTipo(valor, tipoValor), tipoValor);
        // ! valor
        case TipoOperacion.NEGACION:
          valor = !(derechaDato.valor);
          return new Valor(this.line, this.column, this.convercionValorToTipo(valor, tipoValor), tipoValor);
        // valor != valor
        case TipoOperacion.NO_IGUAL:
          valor = izquierdaDato.valor != derechaDato.valor;
          return new Valor(this.line, this.column, this.convercionValorToTipo(valor, tipoValor), tipoValor);
        // valor || valor
        case TipoOperacion.OR:
          valor = izquierdaDato.valor || derechaDato.valor;
          return new Valor(this.line, this.column, this.convercionValorToTipo(valor, tipoValor), tipoValor);
        default:
          break;
      }
    }
    return undefined;
  }

  convercionValorToTipo(valor: any, tipoValor: TipoDato): any {
    switch (tipoValor) {
      case TipoDato.INT:
        return Math.trunc(valor);
      case TipoDato.DECIMAL:
        return Number(valor);
      case TipoDato.STRING:
        return String(valor);
      case TipoDato.BOOLEAN:
        return (valor === "true");
      default:
        return valor
    }
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
        if ((izquierdaDato == TipoDato.STRING && derechaDato == TipoDato.STRING) && this.tipo == TipoOperacion.SUMA) {
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
      
        case TipoOperacion.NEGATIVO:
          return derechaDato;
          case TipoOperacion.NEGACION:
        case TipoOperacion.AND: case TipoOperacion.IGUAL: case TipoOperacion.MAYOR: case TipoOperacion.MAYOR_IGUAL:
          case TipoOperacion.MENOR: case TipoOperacion.MENOR_IGUAL: case TipoOperacion.NO_IGUAL: case TipoOperacion.OR:
          return TipoDato.BOOLEAN;
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
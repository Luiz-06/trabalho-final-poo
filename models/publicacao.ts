import { Perfil } from "./perfil";

export class Publicacao {
  private _id: string;
  private _conteudo: string;
  private _dataHora: Date;
  private _perfilAssociado: string;

  constructor(
    id: string,
    conteudo: string,
    dataHora: Date,
    perfilAssociado: string
  ) {
    this._id = id;
    this._conteudo = conteudo;
    this._dataHora = dataHora;
    this._perfilAssociado = perfilAssociado;
  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  public get conteudo(): string {
    return this._conteudo;
  }
  public set conteudo(value: string) {
    this._conteudo = value;
  }

  public get dataHora(): Date {
    return this._dataHora;
  }
  public set dataHora(value: Date) {
    this._dataHora = value;
  }

  public get perfilAssociado(): string {
    return this._perfilAssociado;
  }
  public set perfilAssociado(value: string) {
    this._perfilAssociado = value;
  }
}

import { Perfil } from "./perfil";

export class Publicacao {
  private _id: number;
  private _conteudo: string;
  private _dataHora: Date;
  private _perfilAssociado: Perfil;

  constructor(
    id: number,
    conteudo: string,
    dataHora: Date,
    perfilAssociado: Perfil
  ) {
    this._id = id;
    this._conteudo = conteudo;
    this._dataHora = dataHora;
    this._perfilAssociado = perfilAssociado;
  }

  public get id(): number {
    return this._id;
  }
  public set id(value: number) {
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

  public get perfilAssociado(): Perfil {
    return this._perfilAssociado;
  }
  public set perfilAssociado(value: Perfil) {
    this._perfilAssociado = value;
  }
}

import { TipoInteracao } from "./tipoInteracao";

export class Interacao {
  private _id: string;
  private _tipo: TipoInteracao;
  private _perfilAutor: string;

  constructor(id: string, tipo: TipoInteracao, perfilAutor: string) {
    this._id = id;
    this._tipo = tipo;
    this._perfilAutor = perfilAutor;
  }

  public get id(): string {
    return this._id;
  }

  public get tipo(): TipoInteracao {
    return this._tipo;
  }

  public get perfilAutor(): string {
    return this._perfilAutor;
  }
}

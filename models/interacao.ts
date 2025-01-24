import { Perfil } from "./perfil";
import { TipoInteracao } from "./tipoInteracao";

export class Interacao {
  private _id: number;
  private _tipoInteracao: TipoInteracao;
  private _perfilAutor: Perfil;

  constructor(id: number, tipoInteracao: TipoInteracao, perfilAutor: Perfil) {
    this._id = id;
    this._tipoInteracao = tipoInteracao;
    this._perfilAutor = perfilAutor;
  }

  public get id(): number {
    return this._id;
  }
  public set id(value: number) {
    this._id = value;
  }

  public get tipoInteracao(): TipoInteracao {
    return this._tipoInteracao;
  }
  public set tipoInteracao(value: TipoInteracao) {
    this._tipoInteracao = value;
  }
  
  public get perfilAutor(): Perfil {
    return this._perfilAutor;
  }
  public set perfilAutor(value: Perfil) {
    this._perfilAutor = value;
  }
}

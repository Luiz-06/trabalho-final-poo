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
    this.validarConteudo(conteudo);
    this._id = id;
    this._conteudo = conteudo;
    this._dataHora = dataHora;
    this._perfilAssociado = perfilAssociado;
  }

  private validarConteudo(conteudo: string): void {
    
    const MAX_CARACTERES = 180;
    
    if (conteudo.trim() === '') {
      throw new Error(`
\x1b[31m╔══════════════════════════════════════════╗
║                                          ║
║   ⚠️ Publicação não pode ser vazia        ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
    }

    if (conteudo.length > MAX_CARACTERES) {
      throw new Error(`
\x1b[31m╔══════════════════════════════════════════╗
║                                          ║
║   ⚠️ Limite de ${MAX_CARACTERES} caracteres excedido   ║
║   Sua publicação tem ${conteudo.length} caracteres     ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
    }
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
  public set conteudo(novoConteudo: string) {
    this.validarConteudo(novoConteudo);
    this._conteudo = novoConteudo;
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

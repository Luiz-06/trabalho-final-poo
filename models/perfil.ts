import { Publicacao } from "./publicacao";

export class Perfil {
  private _idUnico: number;
  private _apelido: string;
  private _email: string;
  private _stats: boolean;
  private _amigos: Perfil[];
  private _foto: string;
  private _publicacoes: Publicacao[];

  constructor(id: number, apelido: string, email: string, foto: string) {
    this._idUnico = id;
    this._apelido = apelido;
    this._email = email;
    this._foto = foto;
    this._stats = true;
    this._amigos = [];
    this._publicacoes = [];
  }

  public get id(): number {
    return this._idUnico;
  }
  public set id(value: number) {
    this._idUnico = value;
  }

  public get apelido(): string {
    return this._apelido;
  }
  public set apelido(value: string) {
    this._apelido = value;
  }

  public get email(): string {
    return this._email;
  }
  public set email(value: string) {
    this._email = value;
  }

  public get stats(): boolean {
    return this._stats;
  }
  public set stats(value: boolean) {
    this._stats = value;
  }

  public get amigos(): Perfil[] {
    return this._amigos;
  }
  public set amigos(value: Perfil[]) {
    this._amigos = value;
  }

  public adicionarAmigo(amigo: Perfil): void {
    this._amigos.push(amigo);
  }

  public removerAmigo(apelidoProcurado: string): void {
    this._amigos = this._amigos.filter(
      (amigos) => amigos._apelido !== apelidoProcurado
    );
  }

  public listarAmigos(): Perfil[] {
    let copiaDeAmigos: Perfil[] = [];

    for (let amigo of this._amigos) {
      let perfilCopiado = new Perfil(
        amigo._idUnico,
        amigo._apelido,
        amigo._email,
        amigo._foto
      );
      copiaDeAmigos.push(perfilCopiado);
    }

    return copiaDeAmigos;
  }

  public adicionarPublicacao(publicacao: Publicacao): void {
    this._publicacoes.push(publicacao);
  }

  public removerPublicacao(id: number): void {
    this._publicacoes = this._publicacoes.filter(
      (publicacoes) => publicacoes.id !== id
    );
  }

  public listarPublicacao(): Publicacao[] {
    let publicacoesCopiadas: Publicacao[] = [];

    for (let publicacao of this._publicacoes) {
      let copiaPub = new Publicacao(
        publicacao.id,
        publicacao.conteudo,
        publicacao.dataHora,
        publicacao.perfilAssociado
      );
      publicacoesCopiadas.push(copiaPub);
    }

    return publicacoesCopiadas;
  }
}

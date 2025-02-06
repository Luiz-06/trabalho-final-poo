import { Publicacao } from "./publicacao";

export class Perfil {
  private _id: string;
  private _apelido: string;
  private _email: string;
  private _stats: boolean;
  private _amigos: string[];
  private _foto: string;
  private _publicacoes: Publicacao[];
  private _solicitacoesAmizade: string[];
  private _senha: string;

  constructor(
    id: string,
    apelido: string,
    email: string,
    foto: string,
    senha: string,
    stats: boolean,
    amigos: string[],
    publicacoes: Publicacao[],
    solicitacoesAmizade: string[]
  ) {
    this._id = id;
    this._apelido = apelido;
    this._email = email;
    this._foto = foto;
    this._senha = senha;
    this._stats = stats;
    this._amigos = amigos;
    this._publicacoes = publicacoes;
    this._solicitacoesAmizade = solicitacoesAmizade;
  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
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

  public get amigos(): string[] {
    return this._amigos;
  }
  public set amigos(value: string[]) {
    this._amigos = value;
  }

  public get foto(): string {
    return this._foto;
  }
  public set foto(value: string) {
    this._foto = value;
  }

  public get senha(): string {
    return this._senha;
  }
  public set senha(value: string) {
    this._senha = value;
  }

  public get publicacoes(): Publicacao[] {
    return this._publicacoes;
  }

  public set publicacoes(value: Publicacao[]) {
    this._publicacoes = value;
  }

  public get solicitacoesAmizade(): string[] {
    return this._solicitacoesAmizade;
  }

  public set solicitacoesAmizade(value: string[]) {
    this._solicitacoesAmizade = value;
  }

  public adicionarAmigo(amigo: string): void {
    if (!this._amigos.includes(amigo)) {
        this._amigos.push(amigo);
    } else {
        console.log(`\x1b[33m⚠️ ${amigo} já está na sua lista de amigos! ⚠️\x1b[0m`);
    }
  }

  public removerAmigo(apelidoProcurado: string): void {
    this._amigos = this._amigos.filter(
      (apelido) => apelido !== apelidoProcurado
    );
  }

  // public listarAmigos(): Perfil[] {
  //   let copiaDeAmigos: Perfil[] = [];

  //   for (let amigo of this._amigos) {
  //     let perfilCopiado = new Perfil(
  //       amigo._id,
  //       amigo._apelido,
  //       amigo._email,
  //       amigo._foto,
  //       amigo._senha,
  //       amigo._stats,
  //       amigo._amigos,
  //       amigo._publicacoes,
  //       amigo._solicitacoesAmizade
  //     );
  //     copiaDeAmigos.push(perfilCopiado);
  //   }

  //   return copiaDeAmigos;
  // }

  public adicionarPublicacao(publicacao: Publicacao): void {
    this._publicacoes.push(publicacao);
  }

  public removerPublicacao(id: string): void {
    const indexPublicacao = this._publicacoes.findIndex(
      (publicacao) => publicacao.id === id
    );
    
    if (indexPublicacao !== -1) {
      this._publicacoes.splice(indexPublicacao, 1);
    }
  }

  public listarPublicacoes(): Publicacao[] {
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

  public addCaixaDeSolicitacoes(perfil: string): void {
    this._solicitacoesAmizade.push(perfil);
  }

  // public aceitarSolicitacao(perfil: Perfil, aceitar: boolean) {
  //   this._solicitacoesAmizade = this._solicitacoesAmizade.filter(
  //     (perfilAtual) => perfilAtual.id !== perfil.id
  //   );

  //   if (aceitar) {
  //     this.adicionarAmigo(perfil);
  //   }
  // }

  public toString(): string {
    return `
Apelido = ${this._apelido}
Email = ${this._email}
Foto = ${this._foto}
Solicitações de amizade = ${this._solicitacoesAmizade.length}
    `;
  }
}

export {Perfil}

class Perfil {
    private _idUnico: number
    private _apelido: string
    private _email: string
    private _stats: boolean
    private _amigos: Perfil[]
    private _foto: string
    //private _postagens: Publicacao[]

  constructor(apelido: string, email: string, foto: string) {
    this._apelido = apelido;
    this._email = email;
    this._stats = true;
    this._amigos = [];
    this._foto = foto;
  }

  public set id(id: number) {
    this._idUnico = id;
  }

  public get id(): number {
    return this._idUnico;
  }

  public set apelido(apelido: string) {
    this._apelido = apelido;
  }

  public get apelido(): string {
    return this._apelido;
  }

  public set email(email: string) {
    this._email = email;
  }

  public get email(): string {
    return this._email;
  }

  public set stats(stats: boolean) {
    this._stats = stats;
  }

  public get stats(): boolean {
    return this._stats;
  }

  public set amigos(amigos: Perfil[]) {
    this._amigos = amigos;
  }

  public get amigos(): Perfil[] {
    return this._amigos;
  }

  public adicionarAmigo(amigo: Perfil): void {
    this._amigos.push(amigo);
  }

  public removerAmigo(apelidoProcurado: string): void {
    this._amigos = this._amigos.filter(
      (amigos) => amigos._apelido !== apelidoProcurado
    );
  }

  public listarCopiaDeAmigos(): Perfil[] {
    let copiaDeAmigos: Perfil[] = [];

    for (let amigo of this._amigos) {
      let perfilCopiado = new Perfil(amigo._apelido, amigo._email, amigo._foto);
      perfilCopiado.id = amigo.id;
      copiaDeAmigos.push(perfilCopiado);
    }

    return copiaDeAmigos;
  }

  //public adicionarPublicacao(){}

  //public listarPublicacao(){}
}


import { Perfil } from "./perfil";
import { Publicacao } from "./publicacao";
import { PublicacaoAvancada } from "./publicacaoAvancada";

export class RedeSocial {
  private _perfisCadastrados: Perfil[];
  private _publicacoesPostadas: Publicacao[];
  private _solicitacoesAmizade: Map<Perfil, Perfil>;

  constructor() {
    this._perfisCadastrados = [];
    this._publicacoesPostadas = [];
  }

  public buscarPerfil(apelidoProcurado: string): Perfil | undefined {
    return this._perfisCadastrados.find(
      (perfil) => perfil.apelido === apelidoProcurado
    );
  }

  private consultarPerfilPorIndice(apelido: string): number {
    return this._perfisCadastrados.findIndex(
      (perfil) => perfil.apelido === apelido
    );
  }

  public adicionarPerfil(perfil: Perfil): void {
    this._perfisCadastrados.push(perfil);
  }

  public removerPerfil(apelidoProcurado: string): void {
    let indexPerfil = this.consultarPerfilPorIndice(apelidoProcurado);

    if (indexPerfil !== -1) {
      let perfilRemovido: Perfil = this._perfisCadastrados[indexPerfil];

      this._publicacoesPostadas = this._publicacoesPostadas.filter(
        (publicacao) => publicacao.perfilAssociado.id !== perfilRemovido.id
      );

      for (let perfil of this._perfisCadastrados) {
        perfil.removerAmigo(apelidoProcurado);
      }

      this._perfisCadastrados.splice(indexPerfil, 1);
    } else {
      console.log("Perfil não encontrado.");
    }
  }

  public listarPerfis(): Perfil[] {
    let copiaDePerfis: Perfil[] = [];

    for (let perfil of this._perfisCadastrados) {
      let perfilCopiado = new Perfil(
        perfil.id,
        perfil.apelido,
        perfil.email,
        perfil.foto
      );
      copiaDePerfis.push(perfilCopiado);
    }

    return copiaDePerfis;
  }

  public ativarPerfil(apelido: string): void {
    let perfilProcurado = this.buscarPerfil(apelido)

    if(perfilProcurado?.stats == false){
        perfilProcurado.stats = true
    }else {
        console.log("Perfil já se encontra desativado.")
    }
  }

  public desativarPerfil(apelido:string): void {
    let perfilProcurado = this.buscarPerfil(apelido)

    if(perfilProcurado?.stats == false){
        perfilProcurado.stats = true
    }else {
        console.log("Perfil já se encontra ativado.")
    }
  }

  //...
}

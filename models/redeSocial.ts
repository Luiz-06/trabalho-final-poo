import {
  carregarDadosPerfis,
  carregarDadosPublicacoes,
} from "../utils/auxFunctions";
import { Perfil } from "./perfil";
import { Publicacao } from "./publicacao";
import { PublicacaoAvancada } from "./publicacaoAvancada";
import { TipoInteracao } from "./tipoInteracao";
import { Interacao } from "./interacao";

export class RedeSocial {
  private _perfisCadastrados: Perfil[];
  private _publicacoesPostadas: Publicacao[];
  //private _solicitacoesAmizade: Map<Perfil, Perfil>;

  constructor() {
    this._perfisCadastrados = carregarDadosPerfis();
    this._publicacoesPostadas = carregarDadosPublicacoes();
  }

  //PERFIL
  public buscarPerfil(apelidoProcurado: string): Perfil | undefined {
    // console.log(this._perfisCadastrados);
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

      this.deletarPublicacao(perfilRemovido);

      this.deletarPerfilDeAmigos(perfilRemovido);

      this._perfisCadastrados.splice(indexPerfil, 1);
    } else {
      console.log("Perfil não encontrado.");
    }
  }

  private deletarPublicacao(perfilRemovido: Perfil): void {
    this._publicacoesPostadas = this._publicacoesPostadas.filter(
      (postagem) => postagem.perfilAssociado.id !== perfilRemovido.id
    );
  }

  private deletarPerfilDeAmigos(perfilRemovido: Perfil): void {
    for (let perfil of this._perfisCadastrados) {
      perfil.removerAmigo(perfilRemovido.apelido);
    }
  }

  public listarPerfis(): Perfil[] {
    let copiaDePerfis: Perfil[] = [];

    for (let perfil of this._perfisCadastrados) {
      let perfilCopiado = new Perfil(
        perfil.id,
        perfil.apelido,
        perfil.email,
        perfil.foto,
        perfil.senha,
        perfil.stats,
        perfil.amigos,
        perfil.publicacoes,
        perfil.solicitacoesAmizade
      );
      copiaDePerfis.push(perfilCopiado);
    }

    return copiaDePerfis;
  }

  public ativarPerfil(apelido: string): void {
    let perfilProcurado = this.buscarPerfil(apelido);

    if (perfilProcurado?.stats == false) {
      perfilProcurado.stats = true;
    } else {
      console.log("Perfil já se encontra ativado.");
    }
  }

  public desativarPerfil(apelido: string): void {
    let perfilProcurado = this.buscarPerfil(apelido);

    if (perfilProcurado?.stats == true) {
      perfilProcurado.stats = false;
    } else {
      console.log("Perfil já se encontra desativado.");
    }
  }

  //PUBLICACOES
  private estaAssociada(publicacao: Publicacao): boolean {
    return publicacao.perfilAssociado ? true : false;
  }

  public adicionarPublicacao(publicacao: Publicacao): void {
    if (!this.estaAssociada(publicacao)) {
      console.log("Esta publicacao não está associada a nenhum perfil");
      return;
    }
    this._publicacoesPostadas.push(publicacao);
  }

  public listarPublicacoes(apelido?: string): Publicacao[] {
    let publicacoesFiltradas = apelido
      ? this._publicacoesPostadas.filter(
          (publicacao) => publicacao.perfilAssociado.apelido === apelido
        )
      : this._publicacoesPostadas;

    publicacoesFiltradas.sort((a, b) => {
      const dataA = new Date(a.dataHora);
      const dataB = new Date(b.dataHora);
      return dataB.getTime() - dataA.getTime(); 
    });

    return publicacoesFiltradas;
  }

  //INTERAÇÕES 

  // SOLICITAÇÕES DE AMIZADE
  public enviarSolicitacaoAmizade(
    apelidoRemetente: string,
    apelidoDestinatario: string
  ): void {
    let remetente = this.buscarPerfil(apelidoRemetente);
    let destinatario = this.buscarPerfil(apelidoDestinatario);

    if (remetente && destinatario) {
      destinatario.addCaixaDeSolicitacoes(remetente);
    }
  }

  public aceitarSolicitacaoAmizade(
    apelidoRemetente: string,
    apelidoDestinatario: string,
    aceitar: boolean
  ): void {
    let destinatario = this.buscarPerfil(apelidoDestinatario);
    let remetente = this.buscarPerfil(apelidoRemetente);

    if (remetente && destinatario) {
      destinatario.aceitarSolicitacao(remetente, aceitar);
    }
  }
}

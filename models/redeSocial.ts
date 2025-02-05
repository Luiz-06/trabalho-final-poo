import { ulid } from "ulid";
import {
  carregarDadosPerfis,
  carregarDadosPublicacoes,
  getData,
} from "../utils/auxFunctions";
import * as aux from "../utils/auxFunctions";
import { Perfil } from "./perfil";
import { Publicacao } from "./publicacao";
import { PublicacaoAvancada } from "./publicacaoAvancada";
import { publicDecrypt } from "crypto";
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
      (perfil) => perfil.apelido === apelidoProcurado && perfil.stats
    );
  }

  public buscarPublicacao(idPublicacao: string): Publicacao | undefined {
    return this._publicacoesPostadas.find((pub) => pub["_id"] === idPublicacao);
  }

  public buscarPerfilPorID(id: string): Perfil | undefined {
    return this._perfisCadastrados.find(
      (perfil) => perfil.id === id && perfil.stats
    );
  }

  private consultarPerfilPorIndice(apelido: string): number {
    return this._perfisCadastrados.findIndex(
      (perfil) => perfil.apelido === apelido && perfil.stats
    );
  }

  public adicionarPerfil(perfil: Perfil): void {
    this._perfisCadastrados.push(perfil);
  }

  public removerPerfil(apelidoProcurado: string): void {
    let indexPerfil = this.consultarPerfilPorIndice(apelidoProcurado);

    if (indexPerfil !== -1) {
      let perfilRemovido: Perfil = this._perfisCadastrados[indexPerfil];

      // this.deletarPublicacao(perfilRemovido);

      this.deletarPerfilDeAmigos(perfilRemovido);

      this._perfisCadastrados.splice(indexPerfil, 1);
    } else {
      console.log("Perfil não encontrado.");
    }
  }

  //PUBLICACOES
  // private deletarPublicacao(perfilRemovido: Perfil): void {
  //   this._publicacoesPostadas.filter(
  //     (postagem) => postagem.perfilAssociado.id !== perfilRemovido.id
  //   );
  // }

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
    if (perfilProcurado?.stats) {
      perfilProcurado.stats = false;
    } else {
      console.log("Perfil já se encontra desativado.");
    }
  }

  //PUBLICACOES
  public criarPublicacao(apelidoPerfil: string): Publicacao | void {
    const perfilAssociado = this.buscarPerfil(apelidoPerfil);

    if (!perfilAssociado) {
      console.log("Perfil não encontrado.");
      return;
    }

    const conteudo = aux.getData("Escreva sua publicação: ");

    const novaPublicacao = new Publicacao(
      ulid(),
      conteudo,
      new Date(),
      perfilAssociado.id
    );
    perfilAssociado.adicionarPublicacao(novaPublicacao);

    this._publicacoesPostadas.push(novaPublicacao);
    console.log("Publicação criada com sucesso!");
    return novaPublicacao;
  }

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

  listarPublicacoes(apelido: string): Publicacao[] {
    // Return the list of publicações for the given user
    return this._publicacoesPostadas.filter((publicacao) => {
      const perfil = this.buscarPerfilPorID(publicacao["_perfilAssociado"]);
      return perfil?.apelido === apelido;
    });
  }

  listarTodasPublicacoes(): Publicacao[] {
    // Return the list of all publicações
    return this._publicacoesPostadas;
  }

  public editarPublicacao(
    apelidoPerfil: string,
    idPublicacao: string,
    novoConteudo: string
  ): boolean {
    const perfil = this.buscarPerfil(apelidoPerfil);
    if (!perfil) return false;

    const publicacao = this.buscarPublicacao(idPublicacao);
    if (!publicacao || publicacao["_perfilAssociado"] !== perfil["_id"]) {
      console.log(
        !publicacao || publicacao["_perfilAssociado"] !== perfil["_id"]
      );

      return false;
    }

    publicacao["_conteudo"] = novoConteudo;

    console.log(publicacao);

    return true;
  }

  public deletarPublicacao(
    apelidoPerfil: string,
    idPublicacao: string
  ): boolean {
    const perfil = this.buscarPerfil(apelidoPerfil);
    if (!perfil) return false;

    const index = perfil.publicacoes.findIndex(
      (p) => p["_id"] === idPublicacao
    );
    if (index === -1) return false;

    perfil.publicacoes.splice(index, 1);
    this._publicacoesPostadas = this._publicacoesPostadas.filter(
      (p) => p["_id"] !== idPublicacao
    );
    return true;
  }

  // Para solicitações de amizade
  public listarSolicitacoes(apelido: string): string[] {
    const perfil = this.buscarPerfil(apelido);
    return perfil ? perfil.solicitacoesAmizade : [];
  }

  public processarSolicitacao(
    apelidoUsuario: string,
    apelidoRemetente: string,
    aceitar: boolean
  ): void {
    const usuario = this.buscarPerfil(apelidoUsuario);
    const remetente = this.buscarPerfil(apelidoRemetente);

    console.log(apelidoRemetente);

    if (usuario && remetente) {
      if (aceitar) {
        // Evita que o usuário adicione a si mesmo
        if (apelidoUsuario !== apelidoRemetente) {
          usuario.adicionarAmigo(apelidoRemetente); // Adiciona o remetente à lista de amigos do usuário
          remetente.adicionarAmigo(apelidoUsuario); // Adiciona o usuário à lista de amigos do remetente
        } else {
          console.log("Você não pode adicionar a si mesmo como amigo.");
        }

        // Remove a solicitação de amizade
        usuario.solicitacoesAmizade = usuario.solicitacoesAmizade.filter(
          (apelido) => apelido !== apelidoRemetente
        );
      } else {
        // Caso a solicitação seja rejeitada, remove da lista de solicitações
        usuario.solicitacoesAmizade = usuario.solicitacoesAmizade.filter(
          (apelido) => apelido !== apelidoRemetente
        );
      }
    }
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
      destinatario.addCaixaDeSolicitacoes(apelidoRemetente);
    }
  }

  // public aceitarSolicitacaoAmizade(
  //   apelidoRemetente: string,
  //   apelidoDestinatario: string,
  //   aceitar: boolean
  // ): void {
  //   let destinatario = this.buscarPerfil(apelidoDestinatario);
  //   let remetente = this.buscarPerfil(apelidoRemetente);

  //   if (remetente && destinatario) {
  //     destinatario.aceitarSolicitacao(remetente, aceitar);
  //   }
  // }
}

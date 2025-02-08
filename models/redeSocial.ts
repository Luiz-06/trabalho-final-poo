import { ulid } from "ulid";
import {
  carregarDadosPerfis,
  carregarDadosPublicacoes,
  getData,
  salvarPublicacoes,
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
  public criarPublicacao(apelidoAutor: string): Publicacao | null {
    const perfil = this.buscarPerfil(apelidoAutor);
    
    if (!perfil || !perfil.stats) {
        console.log("Não é possível criar publicação.");
        return null;
    }

    try {
        const novaPublicacao = new Publicacao(
            ulid(),
            getData("Digite o conteúdo da publicação (máximo 180 caracteres): "),
            new Date(),
            perfil.id
        );

        // Verifica se a publicação já existe
        const publicacaoExistente = this._publicacoesPostadas.find(
            p => p.id === novaPublicacao.id
        );

        if (!publicacaoExistente) {
            this._publicacoesPostadas.push(novaPublicacao);
            perfil.adicionarPublicacao(novaPublicacao);
            
            salvarPublicacoes(this._publicacoesPostadas);
        }
        
        return novaPublicacao;
    } catch (error) {
        console.log(error.message);
        return null;
    }
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

  public listarPublicacoes(apelidoAutor: string): Publicacao[] {
    const perfil = this.buscarPerfil(apelidoAutor);
    
    if (!perfil) return [];

    return this._publicacoesPostadas.filter(p => p.perfilAssociado === perfil.id);
  }

  public listarTodasPublicacoes(): Publicacao[] {
    return this._publicacoesPostadas;
  }

  public editarPublicacao(apelidoAutor: string, idPublicacao: string, novoConteudo: string): boolean {
    const perfil = this.buscarPerfil(apelidoAutor);
    
    if (!perfil) return false;

    const publicacao = this._publicacoesPostadas.find(p => p.id === idPublicacao);
    
    if (!publicacao || publicacao.perfilAssociado !== perfil.id) return false;

    try {
        publicacao.conteudo = novoConteudo;
        
        salvarPublicacoes(this._publicacoesPostadas);
        
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
  }

  public deletarPublicacao(apelidoAutor: string, idPublicacao: string): boolean {
    const perfil = this.buscarPerfil(apelidoAutor);
    
    if (!perfil) return false;

    const indexPublicacao = this._publicacoesPostadas.findIndex(p => p.id === idPublicacao);
    
    if (indexPublicacao === -1 || 
        this._publicacoesPostadas[indexPublicacao].perfilAssociado !== perfil.id) {
      return false;
    }

    this._publicacoesPostadas.splice(indexPublicacao, 1);
    perfil.removerPublicacao(idPublicacao);
    
    salvarPublicacoes(this._publicacoesPostadas);
    
    return true;
  }

  // Para solicitações de amizade
  public listarSolicitacoes(apelido: string): string[] {
    const perfil = this.buscarPerfil(apelido);
    return perfil ? perfil.solicitacoesAmizade : [];
  }

  public processarSolicitacao(
    apelidoDestinatario: string, 
    apelidoRemetente: string, 
    aceitar: boolean
  ): boolean {
    const perfilDestinatario = this.buscarPerfil(apelidoDestinatario);
    const perfilRemetente = this.buscarPerfil(apelidoRemetente);

    if (!perfilDestinatario || !perfilRemetente) {
        console.log("Perfil não encontrado.");
        return false;
    }

    // Remove a solicitação independente do resultado
    perfilDestinatario.solicitacoesAmizade = perfilDestinatario.solicitacoesAmizade.filter(
        apelido => apelido !== apelidoRemetente
    );

    if (aceitar) {
        // Verifica se já são amigos antes de adicionar
        if (!perfilDestinatario.amigos.includes(apelidoRemetente) &&
            !perfilRemetente.amigos.includes(apelidoDestinatario)) {
            
            perfilDestinatario.adicionarAmigo(apelidoRemetente);
            perfilRemetente.adicionarAmigo(apelidoDestinatario);
            
            console.log(`
\x1b[32m╔══════════════════════════════════════════╗
║                                          ║
║     🤝 Amizade confirmada com sucesso!  ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
            
            return true;
        } else {
            console.log(`
\x1b[33m╔══════════════════════════════════════════╗
║                                          ║
║   ⚠️ Vocês já são amigos!               ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
            return false;
        }
    }

    return false;
  }

  //INTERAÇÕES

  // SOLICITAÇÕES DE AMIZADE
  public enviarSolicitacao(apelidoRemetente: string, apelidoDestinatario: string): boolean {
    const perfilRemetente = this.buscarPerfil(apelidoRemetente);
    const perfilDestinatario = this.buscarPerfil(apelidoDestinatario);

    if (!perfilRemetente || !perfilDestinatario) {
        console.log("Perfil não encontrado.");
        return false;
    }

    // Verifica se já são amigos
    if (perfilRemetente.amigos.includes(apelidoDestinatario)) {
        console.log(`
\x1b[33m╔══════════════════════════════════════════╗
║                                          ║
║   ⚠️ Vocês já são amigos!               ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
        return false;
    }

    // Verifica se já existe solicitação pendente
    if (perfilDestinatario.solicitacoesAmizade.includes(apelidoRemetente)) {
        console.log(`
\x1b[33m╔══════════════════════════════════════════╗
║                                          ║
║   ⚠️ Solicitação já enviada!            ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
        return false;
    }

    // Adiciona a solicitação
    perfilDestinatario.addCaixaDeSolicitacoes(apelidoRemetente);
    
    console.log(`
\x1b[32m╔══════════════════════════════════════════╗
║                                          ║
║     📨 Solicitação enviada com sucesso! ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);

    return true;
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

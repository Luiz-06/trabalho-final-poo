import { ulid } from "ulid";
import {
  carregarDadosPerfis,
  carregarDadosPublicacoes,
  getData,
} from "../utils/auxFunctions";
import * as aux from "../utils/auxFunctions"
import { Perfil } from "./perfil";
import { Publicacao } from "./publicacao";
import { PublicacaoAvancada } from "./publicacaoAvancada";
import { publicDecrypt } from "crypto";

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

  public buscarPerfilPorID(id: string): Perfil | undefined{
    return this._perfisCadastrados.find(
      (perfil) => perfil.id === id && perfil.stats
    )
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


  // PUBLICAÇÕES

  public criarPublicacao(apelidoPerfil: string): Publicacao | void{
    const perfilAssociado = this.buscarPerfil(apelidoPerfil);
  
    if (!perfilAssociado) {
      console.log("Perfil não encontrado.");
      return;
    }

    const conteudo = aux.getData("Escreva sua publicação: ") 
    
    const novaPublicacao = new Publicacao(
      ulid(),
      conteudo,
      new Date(), 
      perfilAssociado.id
    );
    perfilAssociado.adicionarPublicacao(novaPublicacao);
  
    this._publicacoesPostadas.push(novaPublicacao);
    console.log("Publicação criada com sucesso!");
    return novaPublicacao
  }
  
  public listarPublicacoes(apelidoPerfil: string): Publicacao[] | void {
    
    const perfilAssociado = this.buscarPerfil(apelidoPerfil);
  
    if (!perfilAssociado) {
      console.log("Perfil não encontrado.");
      return [];
    }
    
    let pub = this._publicacoesPostadas
    // .filter(
    //   (publicacao) => publicacao.perfilAssociado === perfilAssociado.id
    // );

    aux.print(pub)
  }

  public cpPublicacao(): Publicacao[] {
    let copiaDePublicacoes: Publicacao[] = [];
    
    for (let pub of this._publicacoesPostadas) {
      let publicacaoCP = new Publicacao(
        pub.id,
        pub.conteudo,
        pub.dataHora,
        pub.perfilAssociado
      );
      copiaDePublicacoes.push(publicacaoCP);
    }
    return copiaDePublicacoes;
  }


  public listarTodasPublicacoes(): void{
      // this._publicacoesPostadas.forEach((pub) => aux.print(pub["_conteudo"]));
    this._publicacoesPostadas.map(
      (pub) => aux.print(`${this.buscarPerfilPorID(pub["_perfilAssociado"])?.apelido} publicou: ${pub["_conteudo"]}`)
    );
  }






  // private deletarPublicacao(perfilRemovido: Perfil): void {
  //   this._publicacoesPostadas.filter(
  //     (postagem) => postagem.perfilAssociado. !== perfilRemovido.id
  //   );
  // }



  
  //SOLICITACOES
  public enviarSolicitacaoAmizade(
    apelidoRemetente: string,
    apelidoDestinatario: string
  ): void {
    let perfilRemetente = this.buscarPerfil(apelidoRemetente);
    let perfilDestinatario = this.buscarPerfil(apelidoDestinatario);

    if (perfilRemetente && perfilDestinatario) {
      perfilDestinatario.addCaixaDeSolicitacoes(perfilRemetente);
    }
  }
}

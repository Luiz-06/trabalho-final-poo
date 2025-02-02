import { log } from "console";
import { Perfil } from "./models/perfil";
import { RedeSocial } from "./models/redeSocial";
import {
  choosePhoto,
  clear,
  getData,
  getNumber,
  print,
  salvarDadosPerfis,
  salvarDadosPublicacoes,
  lerDadosPerfis
} from "./utils/auxFunctions";
import * as validations from "./validations/validations";

import { ulid } from "ulid";

class App {
  private _isLoggedIn: boolean;
  private _perfilAtual: Perfil | null;
  private _redeSocial: RedeSocial;

  constructor() {
    this._isLoggedIn = false;
    this._perfilAtual = null;
    this._redeSocial = new RedeSocial();
  }

  public start(): void {
    while (!this._isLoggedIn) {
      console.log(`
Bem vindo à Rede Social!
Por favor, escolha uma das opções abaixo para continuar:
1 - Login
2 - Criar Conta
3 - Recuperar Senha
0 - Sair
      `);
      const opcao = getData("Digite a opção desejada: ");

      switch (opcao) {
        case "1":
          this.login();
          break;
        case "2":
          this.criarConta();
          salvarDadosPerfis(this._redeSocial.listarPerfis());
          break;
        case "3":
          this.recuperarSenha();
          break;
        case "4": // remover essa merda, so ta pq sou preguiçoso
          const perfil: Perfil | undefined = this._redeSocial.buscarPerfil("1");
          if (perfil){
            print("Login realizado com sucesso!");
            this._perfilAtual = perfil;
            this._isLoggedIn = true;
          }
          break
        case "0":
          print("Aplicação encerrada!");
          return;
        default:
          print("Opção inválida! Tente novamente.");
      }
    }

    this.menuPrincipal();
  }

  private login(): void {
    const apelido = getData("Digite seu nome de usuário: ");
    const senha = getData("Digite sua senha: ");
    const perfil: Perfil | undefined = this._redeSocial.buscarPerfil(apelido);

    if (perfil && perfil.stats) {
      if (apelido === perfil.apelido && senha === perfil.senha) {
        print("Login realizado com sucesso!");
        this._perfilAtual = perfil;
        this._isLoggedIn = true;
      } 
    } else {
      console.log("Usuário ou senha inválidos. Tente novamente.");
    } // fiz isso para que quando nao haja perfil, o usuário não saiba disso, porque se ele soubesse ele poderia testar ate descobrir usuários que existem 
  }

  private criarConta(): void {
    const apelido = getData("Escolha um nome de usuário: ");
    validations.possiveisErrosUsername(apelido)
    const senha = getData("Escolha uma senha: ");
    const email = getData("Digite seu email: ");
    const foto = choosePhoto();

    const novoPerfil: Perfil = new Perfil(
      ulid(),
      apelido,
      email,
      foto,
      senha,
      true,
      [],
      [],
      []
    );
    this._redeSocial.adicionarPerfil(novoPerfil);

    print(`Conta criada com sucesso! Bem-vindo, ${apelido}!`);
    this._isLoggedIn = true;
    this._perfilAtual = novoPerfil;
  }

  private recuperarSenha(): void {
    const apelido = getData("Digite o seu apelido: ");
    const perfilDesejado = this._redeSocial.buscarPerfil(apelido);

    if (perfilDesejado) {
      const emailAssociado = perfilDesejado?.email;
      print(
        `Um e-mail de recuperação foi enviado para ${emailAssociado}. Verifique sua caixa de entrada!`
      );

      const codRecuperacao = getData(
        "Digite o código que foi enviado para seu email: "
      );

      if (codRecuperacao === "1234") {
        const novaSenha = getData("Insira sua nova senha: ");
        perfilDesejado.senha = novaSenha;
      } else {
        print("Código inserido inválido!");
      }
    }
  }

  private menuPrincipal(): void {
    let opcao: string = "";
    let appOn: boolean = true;

    do {
      clear();
      console.log(`
\nBem vindo ${this._perfilAtual?.apelido}
Menu Principal:
1 - Configurações do Perfil
2 - Publicações
3 - Solicitações
0 - Sair
      `);

      opcao = getData("Digite a opção desejada: ");

      switch (opcao) {
        case "1":
          this.menuPerfil();
          break;
        case "2":
          this.menuPublicacoes();
          break;
        case "3":
          this.menuSolicitacoes();
          break;
        case "0":
          print("Você saiu do sistema. Até logo!");
          appOn = false;
          break;
        default:
          print("Opção inválida! Tente novamente.");
          break;
      }
    } while (appOn === true);
  }

  private menuPerfil(): void {
    let opcao: string = "";

    do {
      clear();
      console.log(`
\nConfigurações do Perfil:
1 - Visualizar Perfil
2 - Alterar Perfil
3 - Deletar Perfil
0 - Voltar ao Menu Principal
      `);

      opcao = getData("Digite a opção desejada: ");

      switch (opcao) {
        case "1":
          this.acessarPerfil();
          break;
        case "2":
          this.menuAlterarPerfil();
          break;
        case "3":
          if(validations.validationTrocarSenha(this._perfilAtual!.senha)){
            print("Deletando perfil...");
            this._redeSocial.desativarPerfil(this._perfilAtual!.apelido);
            this._perfilAtual = null;
            this._isLoggedIn = false;
            salvarDadosPerfis(this._redeSocial.listarPerfis());
            print("...");
            print("...");
            print("Perfil Deletado!\n");
            clear();
            this.start();
          }
          return;
        case "0":
          print("Voltando ao Menu Principal...");
          break;
        default:
          print("Opção inválida! Tente novamente.");
          break;
      }
    } while (opcao !== "0");
  }

  private menuPublicacoes(): void {
    let opcao: string = "";

    do {
      clear();
      console.log(`
\nPublicações:
1 - Visualizar Publicação
2 - Criar Publicação
3 - Alterar Publicação
4 - Deletar Publicação
5 - Visualizar Minhas Publicações

0 - Voltar ao Menu Principal
      `);

      opcao = getData("Digite a opção desejada: ");

      switch (opcao) {
        case "1":
          this.visualizarPublicacao();
          break;
        case "2":
          this.criarPublicacao();
          break;
        case "3":
          this.alterarPublicacao();
          break;
        case "4":
          this.deletarPublicacao();
          break;
        case "5":
          this.visualizarMinhasPublicacoes();
          break;
        case "0":
          print("Voltando ao Menu Principal...");
          break;
        default:
          print("Opção inválida! Tente novamente.");
          break;
      }
    } while (opcao !== "0");
  }

  private menuSolicitacoes(): void {
    let opcao: string = "";

    do {
      clear();
      console.log(`
\nSolicitações:
1 - Visualizar Solicitações
2 - Aceitar Solicitação
3 - Recusar Solicitação
0 - Voltar ao Menu Principal
      `);

      opcao = getData("Digite a opção desejada: ");

      switch (opcao) {
        case "1":
          this.visualizarSolicitacoes();
          break;
        case "2":
          this.aceitarSolicitacao();
          break;
        case "3":
          this.recusarSolicitacao();
          break;
        case "0":
          print("Voltando ao Menu Principal...");
          break;
        default:
          print("Opção inválida! Tente novamente.");
          break;
      }
    } while (opcao !== "0");
  }

  private acessarPerfil(): void {
    if (this._perfilAtual) {
      print(this._perfilAtual.toString());
    }
  }

  private alterarPerfil(): void {}

  private menuAlterarPerfil(): void {
    let opcao: string = "";

    do {
      clear();
      print(`
O que deseja alterar?
1 - Apelido
2 - Email
3 - Foto
4 - Senha
5 - Desativar conta
0 - Voltar
      `);

      opcao = getData("Digite a opção desejada: ");

      switch (opcao) {
        case "1":
          const novoApelido = getData("Insira o novo apelido: ");
          if (validations.validationTrocarApelido(novoApelido)){
            this._perfilAtual!.apelido = novoApelido
            salvarDadosPerfis(this._redeSocial.listarPerfis());
            print("Apelido trocado com sucesso")
          }break
        case "2":
          const novoEmail = getData("Insira o novo email: ");
          if (validations.validationEmail(novoEmail)){
            this._perfilAtual!.apelido = novoEmail
            salvarDadosPerfis(this._redeSocial.listarPerfis());
            print("Email alterado com sucesso")
          }break
        case "3":
          const novaFoto = choosePhoto();
          this._perfilAtual!.foto = novaFoto;
          salvarDadosPerfis(this._redeSocial.listarPerfis());
          break;
        case "4":
          if(validations.validationTrocarSenha(this._perfilAtual!.senha)){
            const novaSenha = getData("Insira o nova senha: ");
            this._perfilAtual!.senha = novaSenha
            salvarDadosPerfis(this._redeSocial.listarPerfis());
            print("Senha alterada com sucesso")
          }break;
        case "5":
          this._perfilAtual!.stats = false
          print("Perfil desativado!")
          break;
        case "0":
          print("Voltando ao Menu Principal...");
          break;
        default:
          print("Opção inválida! Tente novamente.");
          break;
      }
    } while (opcao !== "0");
  }

  private visualizarPublicacao(): void {
    this._redeSocial.listarTodasPublicacoes()
  }

  private visualizarMinhasPublicacoes(): void {
    print(this._redeSocial.listarPublicacoes(this._perfilAtual!.apelido))
    print("Visualizando publicação...");
  }

  private criarPublicacao(): void {
    print("Criando publicação...");
    let pub = this._redeSocial.criarPublicacao(this._perfilAtual!.apelido)
    if (pub) salvarDadosPublicacoes(pub)
    salvarDadosPerfis(this._redeSocial.listarPerfis())
  }

  private alterarPublicacao(): void {
    print("Alterando publicação...");
  }

  private deletarPublicacao(): void {
    print("Deletando publicação...");
  }

  private visualizarSolicitacoes(): void {
    print("Visualizando solicitações...");
  }

  private aceitarSolicitacao(): void {
    print("Aceitando solicitação...");
  }

  private recusarSolicitacao(): void {
    print("Recusando solicitação...");
  }
}

const app: App = new App();
app.start();

import { clear, getData, print } from "./utils/auxFunctions";

class App {
  private isLoggedIn: boolean;

  constructor() {
    this.isLoggedIn = false;
  }

  public start(): void {
    while (!this.isLoggedIn) {
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
          break;
        case "3":
          this.recuperarSenha();
          break;
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
    const username = getData("Digite seu nome de usuário: ");
    const password = getData("Digite sua senha: ");

    if (username === "admin" && password === "1234") {
      print("Login realizado com sucesso!");
      this.isLoggedIn = true;
    } else {
      print("Usuário ou senha inválidos. Tente novamente.");
    }
  }

  private criarConta(): void {
    const username = getData("Escolha um nome de usuário: ");
    const password = getData("Escolha uma senha: ");
    print(`Conta criada com sucesso! Bem-vindo, ${username}!`);
    this.isLoggedIn = true;
  }

  private recuperarSenha(): void {
    const email = getData("Digite o e-mail associado à sua conta: ");
    print(
      `Um e-mail de recuperação foi enviado para ${email}. Verifique sua caixa de entrada!`
    );
  }

  private menuPrincipal(): void {
    let opcao: string = "";
    let appOn: boolean = true;

    do {
      clear();
      console.log(`
\nMenu Principal:
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
          this.alterarPerfil();
          break;
        case "3":
          print("Deletando perfil...");
          this.isLoggedIn = false;
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
    print("Acessando perfil...");
  }

  private alterarPerfil(): void {
    print("Alterando perfil...");
  }

  private visualizarPublicacao(): void {
    print("Visualizando publicação...");
  }

  private criarPublicacao(): void {
    print("Criando publicação...");
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

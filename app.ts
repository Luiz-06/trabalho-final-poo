import { clear, getData, print } from "./utils/auxFunctions";

class App {
  // private _redeSocial: RedeSocial;
  private isLoggedIn: boolean;

  constructor() {
    // this._redeSocial = new RedeSocial();
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
          return; // Encerra o programa
        default:
          print("Opção inválida! Tente novamente.");
      }
    }

    this.menuPrincipal(); // Se logado, acessa o menu principal
  }

  private login(): void {
    const username = getData("Digite seu nome de usuário: ");
    const password = getData("Digite sua senha: ");

    // Aqui você pode implementar a validação do login com o banco de dados
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
    this.isLoggedIn = true; // Após criar a conta, o usuário é automaticamente logado
  }

  private recuperarSenha(): void {
    const email = getData("Digite o e-mail associado à sua conta: ");
    // Simula envio de e-mail para redefinir senha
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
--------- Perfis -----------
1 - Acessar Perfil
2 - Alterar Perfil
3 - Deletar Perfil

--------- Publicação -----------
11 - Visualizar Publicação
12 - Criar Publicação
13 - Alterar Publicação
14 - Deletar Publicação

---------- Solicitações ------------
21 - Visualizar Solicitações
22 - Aceitar Solicitação
23 - Recusar Solicitação

0 - Sair
      `);

      let opcao = getData("Digite a opção desejada: ");

      switch (opcao) {
        case "1":
          this.acessarPerfil();
          break;
        case "2":
          this.alterarPerfil();
          break;
        case "3":
          //   this.deletarPerfil();
          break;
        case "11":
          this.visualizarPublicacao();
          break;
        case "12":
          this.criarPublicacao();
          break;
        case "13":
          this.alterarPublicacao();
          break;
        case "14":
          this.deletarPublicacao();
          break;
        case "21":
          this.visualizarSolicitacoes();
          break;
        case "22":
          this.aceitarSolicitacao();
          break;
        case "23":
          this.recusarSolicitacao();
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

  private acessarPerfil(): void {
    print("Acessando perfil...");
  }

  private criarPerfil(): void {
    print("Criando perfil...");
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

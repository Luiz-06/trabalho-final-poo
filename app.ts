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
  lerDadosPerfis,
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
    console.clear();
    console.log(`
\x1b[36m╔══════════════════════════════════════════╗
║ 🌐 Bem-vindo à Rede Social Interativa 🌐   ║
╠══════════════════════════════════════════╣
║                                          ║
║   \x1b[33m✨ Conecte-se, Compartilhe, Interaja! ✨\x1b[36m ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);

    console.log(`
\x1b[34m┌─────────────────────────────────────────┐
│ 🔐 Opções de Acesso                     │
├─────────────────────────────────────────┤
│ \x1b[33m1\x1b[34m - \x1b[32mLogin                        \x1b[34m│
│ \x1b[33m2\x1b[34m - \x1b[32mCriar Nova Conta             \x1b[34m│
│ \x1b[33m3\x1b[34m - \x1b[33mRecuperar Senha              \x1b[34m│
│ \x1b[33m0\x1b[34m - \x1b[31mSair                         \x1b[34m│
└─────────────────────────────────────────┘\x1b[0m`);

    while (!this._isLoggedIn) {
      const opcao = getData("\n➤ Escolha uma opção: ");

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
        case "0":
          this.sairDoSistema();
          return;
        default:
          print("\x1b[33m⚠ Opção inválida! Tente novamente. ⚠\x1b[0m");
      }
    }

    this.menuPrincipal();
  }

  private sairDoSistema(): void {
    console.log(`
\x1b[31m╔══════════════════════════════════╗
║                                          ║
║        🌅 Até a próxima! 👋              ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
    
    process.exit(0);
  }

  private login(): void {
    console.log('\n\x1b[34m🔐 Autenticação de Usuário \x1b[0m');
    const apelido = getData("👤 Nome de usuário: ");
    const senha = getData("🔑 Senha: ");
    
    const perfil: Perfil | undefined = this._redeSocial.buscarPerfil(apelido);

    if (perfil && perfil.stats) {
      if (apelido === perfil.apelido && senha === perfil.senha) {
        console.log(`
\x1b[32m╔══════════════════════════════════╗
║                                          ║
║     🎉 Login realizado com sucesso!      ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
        
        this._perfilAtual = perfil;
        this._isLoggedIn = true;
        return;
      }
    }
    
    console.log(`
\x1b[31m╔══════════════════════════════════════════╗
║                                          ║
║   ⚠️ Usuário ou senha inválidos           ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
  }

  private criarConta(): void {
    console.log('\n\x1b[34m📝 Criar Nova Conta \x1b[0m');
    
    const apelido = getData("👤 Escolha um nome de usuário: ");
    try {
      validations.possiveisErrosUsername(apelido);
    } catch (error) {
      console.log(`\x1b[31m⚠️ ${error.message}\x1b[0m`);
      return;
    }

    const senha = getData("🔐 Escolha uma senha: ");
    const email = getData("📧 Digite seu email: ");
    
    console.log('\n🖼️ Escolha sua foto de perfil:');
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

    console.log(`
\x1b[32m╔══════════════════════════════════╗
║                                          ║
║     🎉 Conta criada com sucesso!         ║
║     Bem-vindo, ${apelido}!               ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);

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

  private criarLinha(caractere: string = '-', comprimento: number = 40): string {
    return caractere.repeat(comprimento);
  }

  private centralizarTexto(texto: string, largura: number = 40): string {
    const espacosEsquerda = Math.floor((largura - texto.length) / 2);
    const espacosDireita = largura - texto.length - espacosEsquerda;
    return ' '.repeat(espacosEsquerda) + texto + ' '.repeat(espacosDireita);
  }

  private exibirTitulo(titulo: string): void {
    console.log('\n' + this.criarLinha('='));
    console.log(this.centralizarTexto(titulo.toUpperCase()));
    console.log(this.criarLinha('=') + '\n');
  }

  private menuPrincipal(): void {
    let opcao: string = "";
    let appOn: boolean = true;

    do {
      clear();
      this.exibirTitulo(`Bem-vindo, ${this._perfilAtual?.apelido}`);
      
      console.log(`
\x1b[36m┌─────────────────────────────────┐
│ 🏠 Menu Principal               │
├─────────────────────────────────┤
│ \x1b[33m1\x1b[36m - \x1b[34mConfigurar Perfil         \x1b[36m│
│ \x1b[33m2\x1b[36m - \x1b[34mPublicações              \x1b[36m│
│ \x1b[33m3\x1b[36m - \x1b[34mSolicitações             \x1b[36m│
│ \x1b[33m0\x1b[36m - \x1b[31mSair do Sistema          \x1b[36m│
└─────────────────────────────────┘\x1b[0m`);

      opcao = getData("\n➤ Escolha uma opção: ");

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
          print("\x1b[31m✘ Saindo do sistema. Até logo! ✘\x1b[0m");
          appOn = false;
          break;
        default:
          print("\x1b[33m⚠ Opção inválida! Tente novamente. ⚠\x1b[0m");
          break;
      }
    } while (appOn === true);
  }

  private menuPerfil(): void {
    let opcao: string = "";

    do {
      clear();
      this.exibirTitulo('Configurações do Perfil');
      
      console.log(`
\x1b[36m┌─────────────────────────────────┐
│ 👤 Opções de Perfil             │
├─────────────────────────────────┤
│ \x1b[33m1\x1b[36m - \x1b[34mVisualizar Perfil        \x1b[36m│
│ \x1b[33m2\x1b[36m - \x1b[34mAlterar Perfil           \x1b[36m│
│ \x1b[33m3\x1b[36m - \x1b[31mDeletar Perfil           \x1b[36m│
│ \x1b[33m0\x1b[36m - \x1b[32mVoltar                   \x1b[36m│
└─────────────────────────────────┘\x1b[0m`);

      opcao = getData("\n➤ Escolha uma opção: ");

      switch (opcao) {
        case "1":
          this.acessarPerfil();
          break;
        case "2":
          this.menuAlterarPerfil();
          break;
        case "3":
          if (validations.validationTrocarSenha(this._perfilAtual!.senha)) {
            print("\x1b[31m🗑 Deletando perfil... 🗑\x1b[0m");
            this._redeSocial.desativarPerfil(this._perfilAtual!.apelido);
            this._perfilAtual = null;
            this._isLoggedIn = false;
            salvarDadosPerfis(this._redeSocial.listarPerfis());
            print("\x1b[31m✘ Perfil Deletado! ✘\x1b[0m");
            this.start();
          }
          return;
        case "0":
          print("\x1b[32m↩ Voltando ao Menu Principal... ↩\x1b[0m");
          break;
        default:
          print("\x1b[33m⚠ Opção inválida! Tente novamente. ⚠\x1b[0m");
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

      salvarDadosPublicacoes(this._redeSocial.listarTodasPublicacoes());
    } while (opcao !== "0");
  }

  visualizarPublicacao(): void {
    const publicacoes = this._redeSocial.listarTodasPublicacoes();
    publicacoes.forEach((publicacao) => {
      const perfil = this._redeSocial.buscarPerfilPorID(
        publicacao["_perfilAssociado"]
      );
      console.log(
        `Usuario: ${perfil!.apelido}, Conteúdo: ${publicacao["_conteudo"]}`
      );
    });
  }

  visualizarMinhasPublicacoes(): void {
    const minhasPublicacoes = this._redeSocial.listarPublicacoes(
      this._perfilAtual!.apelido
    );
    minhasPublicacoes.forEach((publicacao) => {
      const perfil = this._redeSocial.buscarPerfilPorID(
        publicacao["_perfilAssociado"]
      );
      console.log(
        `Usuario: ${perfil!.apelido}, Conteúdo: ${publicacao["_conteudo"]}`
      );
    });
  }

  private criarPublicacao(): void {
    print("Criando publicação...");
    let pub = this._redeSocial.criarPublicacao(this._perfilAtual!.apelido);
    if (pub) salvarDadosPublicacoes(this._redeSocial.listarTodasPublicacoes());
    salvarDadosPerfis(this._redeSocial.listarPerfis());
  }

  private alterarPublicacao(): void {
    const publicacoes = this._perfilAtual?.publicacoes;
    if (publicacoes) {
      if (publicacoes.length === 0) {
        print("Você não tem publicações para alterar");
        return;
      }

      print("\nSuas publicações:");
      publicacoes.forEach((pub, index) => {
        print(`ID: ${index + 1}`);
        print(`Conteúdo: ${pub["_conteudo"]}`);
        print("-----------------------");
      });

      const index = getNumber(
        "\nDigite o ID da publicação que deseja alterar: "
      );

      const idPublicacao = publicacoes[index - 1]["_id"];
      const novoConteudo = getData("Digite o novo conteúdo: ");

      this._redeSocial.editarPublicacao(
        this._perfilAtual!.apelido,
        idPublicacao,
        novoConteudo
      );
    }
  }

  private deletarPublicacao(): void {
    const publicacoes = this._perfilAtual?.publicacoes;
    if (publicacoes) {
      if (publicacoes.length === 0) {
        print("Você não tem publicações para deletar");
        return;
      }

      print("\nSuas publicações:");
      publicacoes.forEach((pub, index) => {
        print(`ID: ${index + 1}`);
        print(`Conteúdo: ${pub["_conteudo"]}`);
        print("-----------------------");
      });

      const index = getNumber(
        "\nDigite o ID da publicação que deseja deletar: "
      );

      const idPublicacao = publicacoes[index - 1]["_id"];

      this._redeSocial.deletarPublicacao(
        this._perfilAtual!.apelido,
        idPublicacao
      );
    }
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
4 - Enviar Solicitação
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
        case "4":
          this.enviarSolicitacao();
          break;
        case "0":
          print("Voltando ao Menu Principal...");
          break;
        default:
          print("Opção inválida! Tente novamente.");
          break;
      }
      salvarDadosPerfis(this._redeSocial.listarPerfis());
    } while (opcao !== "0");
  }

  private visualizarSolicitacoes(): void {
    const solicitacoes = this._redeSocial.listarSolicitacoes(
      this._perfilAtual!.apelido
    );
    solicitacoes.forEach((solicitacao) => {
      const perfil = this._redeSocial.buscarPerfil(solicitacao);
      console.log(`Solicitante: ${perfil!["_apelido"]}`);
    });
  }

  private aceitarSolicitacao(): void {
    const solicitacoes = this._perfilAtual?.solicitacoesAmizade;
    if (solicitacoes) {
      if (solicitacoes.length === 0) {
        console.log("Você não tem solicitações de amizade");
      } else {
        solicitacoes.forEach((perfil, index) => {
          console.log(`Id: ${index + 1} - Usuário: ${perfil}`);
        });

        const index = getNumber(
          "\nDigite o ID do usuário que deseja aceitar a solicitação de amizada: "
        );

        const apelidoPerfil = solicitacoes[index - 1];

        this._redeSocial.processarSolicitacao(
          this._perfilAtual!.apelido,
          apelidoPerfil,
          true
        );
      }
    }
  }

  private recusarSolicitacao(): void {
    const solicitacoes = this._perfilAtual?.solicitacoesAmizade;
    if (solicitacoes) {
      if (solicitacoes.length === 0) {
        console.log("Você não tem solicitações de amizade");
      } else {
        solicitacoes.forEach((perfil, index) => {
          console.log(`Id: ${index + 1} - Usuário: ${perfil}`);
        });

        const index = getNumber(
          "\nDigite o ID do usuário que deseja aceitar a solicitação de amizada: "
        );

        const apelidoPerfil = solicitacoes[index - 1];

        this._redeSocial.processarSolicitacao(
          this._perfilAtual!.apelido,
          apelidoPerfil,
          false
        );
      }
    }
  }

  private enviarSolicitacao(): void {
    const usuariosAtuais = this._redeSocial.listarPerfis();
    usuariosAtuais.forEach((perfil, index) => {
      if (perfil["_apelido"] !== this._perfilAtual?.apelido) {
        console.log(`Id: ${index + 1} - Usuário: ${perfil["_apelido"]}`);
      }
    });

    const index = getNumber(
      "\nDigite o ID do usuário que deseja adicionar como amigo: "
    );

    // const idPerfil = usuariosAtuais[index - 1]["_id"];
    const apelidoPerfil = usuariosAtuais[index - 1]["_apelido"];

    this._redeSocial.enviarSolicitacaoAmizade(
      this._perfilAtual!.apelido,
      apelidoPerfil
    );
  }

  private acessarPerfil(): void {
    if (this._perfilAtual) {
      print(this._perfilAtual.toString());
    }
  }

  private menuAlterarPerfil(): void {
    let opcao: string = "";

    do {
        clear();
        this.exibirTitulo('Alterar Perfil');
        
        console.log(`
\x1b[36m┌─────────────────────────────────────────┐
│ 🛠️  Configurações de Perfil             │
├─────────────────────────────────────────┤
│ \x1b[33m1\x1b[36m - \x1b[34m👤 Alterar Apelido            \x1b[36m│
│ \x1b[33m2\x1b[36m - \x1b[34m📧 Alterar Email             \x1b[36m│
│ \x1b[33m3\x1b[36m - \x1b[34m🖼️  Alterar Foto             \x1b[36m│
│ \x1b[33m4\x1b[36m - \x1b[34m🔐 Alterar Senha             \x1b[36m│
│ \x1b[33m5\x1b[36m - \x1b[31m❌ Desativar Conta            \x1b[36m│
│ \x1b[33m0\x1b[36m - \x1b[32m↩ Voltar                     \x1b[36m│
└─────────────────────────────────────────┘\x1b[0m`);

        opcao = getData("\n➤ Escolha uma opção: ");

        switch (opcao) {
            case "1":
                this.alterarApelido();
                break;
            case "2":
                this.alterarEmail();
                break;
            case "3":
                this.alterarFoto();
                break;
            case "4":
                this.alterarSenha();
                break;
            case "5":
                this.desativarConta();
                break;
            case "0":
                print("\x1b[32m↩ Voltando ao Menu Principal... ↩\x1b[0m");
                break;
            default:
                print("\x1b[33m⚠ Opção inválida! Tente novamente. ⚠\x1b[0m");
                break;
        }
    } while (opcao !== "0");
  }

  // Métodos auxiliares para cada alteração
  private alterarApelido(): void {
    const novoApelido = getData("\x1b[34m👤 Insira o novo apelido: \x1b[0m");
    
    try {
        if (validations.validationTrocarApelido(novoApelido)) {
            this._perfilAtual!.apelido = novoApelido;
            salvarDadosPerfis(this._redeSocial.listarPerfis());
            
            console.log(`
\x1b[32m╔══════════════════════════════════════════╗
║                                          ║
║     🎉 Apelido alterado com sucesso!    ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
        }
    } catch (error) {
        console.log(`\x1b[31m⚠️ ${error.message}\x1b[0m`);
    }
    
    getData("\nPressione Enter para continuar...");
  }

  private alterarEmail(): void {
    const novoEmail = getData("\x1b[34m📧 Insira o novo email: \x1b[0m");
    
    try {
        if (validations.validationEmail(novoEmail)) {
            this._perfilAtual!.email = novoEmail;
            salvarDadosPerfis(this._redeSocial.listarPerfis());
            
            console.log(`
\x1b[32m╔══════════════════════════════════════════╗
║                                          ║
║     🎉 Email alterado com sucesso!      ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
        }
    } catch (error) {
        console.log(`\x1b[31m⚠️ ${error.message}\x1b[0m`);
    }
    
    getData("\nPressione Enter para continuar...");
  }

  private alterarFoto(): void {
    console.log('\n🖼️  Escolha sua nova foto de perfil:');
    const novaFoto = choosePhoto();
    
    this._perfilAtual!.foto = novaFoto;
    salvarDadosPerfis(this._redeSocial.listarPerfis());
    
    console.log(`
\x1b[32m╔══════════════════════════════════════════╗
║                                          ║
║     🎉 Foto de perfil atualizada!       ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
    
    getData("\nPressione Enter para continuar...");
  }

  private alterarSenha(): void {
    if (validations.validationTrocarSenha(this._perfilAtual!.senha)) {
        const novaSenha = getData("\x1b[34m🔐 Insira a nova senha: \x1b[0m");
        
        this._perfilAtual!.senha = novaSenha;
        salvarDadosPerfis(this._redeSocial.listarPerfis());
        
        console.log(`
\x1b[32m╔══════════════════════════════════════════╗
║                                          ║
║     🎉 Senha alterada com sucesso!      ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
    }
    
    getData("\nPressione Enter para continuar...");
  }

  private desativarConta(): void {
    const confirmacao = getData("\x1b[31m❗ Tem certeza que deseja desativar sua conta? (s/n): \x1b[0m");
    
    if (confirmacao.toLowerCase() === 's') {
        this._redeSocial.desativarPerfil(this._perfilAtual!.apelido);
        this._perfilAtual = null;
        this._isLoggedIn = false;
        salvarDadosPerfis(this._redeSocial.listarPerfis());
        
        console.log(`
\x1b[31m╔══════════════════════════════════════════╗
║                                          ║
║     ❌ Conta desativada com sucesso!    ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
        
        this.start();
    } else {
        print("\x1b[32m↩ Operação cancelada. ↩\x1b[0m");
    }
  }
}

const app: App = new App();
app.start();

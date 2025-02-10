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
import * as vals from "./utils/validations";
import { PerfilAvancado } from "./models/perfilAvancado";
import { PublicacaoAvancada } from "./models/publicacaoAvancada";

import { ulid } from "ulid";
import { Interacao } from "./models/interacao";
import { TipoInteracao } from "./models/tipoInteracao";

import { execSync } from "child_process";

if (process.platform === "win32") {
  execSync("chcp 65001 > nul");
}

export class App {
  private _isLoggedIn: boolean;
  private _perfilAtual: Perfil | null | PerfilAvancado | any;
  private _redeSocial: RedeSocial;

  constructor() {
    this._isLoggedIn = false;
    this._perfilAtual = null;
    this._redeSocial = new RedeSocial();

    // Adiciona perfil de administrador se não existir
    const perfilAdm = this._redeSocial.buscarPerfil("adm");
    if (!perfilAdm) {
      const novoPerfilAdm = PerfilAvancado.criarPerfilAdministrador();
      this._redeSocial.adicionarPerfil(novoPerfilAdm);
      salvarDadosPerfis(this._redeSocial.listarPerfis());
    }
  }

  public start(): void {
    console.clear();
    console.log(`
      \x1b[36m╔══════════════════════════════════════════╗
      ║ 🌐 Bem-vindo à Rede Social Interativa 🌐 ║
      ╠══════════════════════════════════════════╣
      ║                                          ║
      ║ \x1b[33m✨ Conecte-se, Compartilhe, Interaja! ✨\x1b[36m ║
      ║                                          ║
      ╚══════════════════════════════════════════╝\x1b[0m`);

    console.log(`
      \x1b[34m┌─────────────────────────────────────────┐
      │ 🔐 Opções de Acesso                     │
      ├─────────────────────────────────────────┤
      │ \x1b[33m1\x1b[34m - \x1b[32mLogin                               \x1b[34m│
      │ \x1b[33m2\x1b[34m - \x1b[32mCriar Nova Conta                    \x1b[34m│
      │ \x1b[33m3\x1b[34m - \x1b[33mRecuperar Senha                     \x1b[34m│
      │ \x1b[33m4\x1b[34m - \x1b[35mLogin de Perfil Avançado            \x1b[34m│
      │ \x1b[33m0\x1b[34m - \x1b[31mSair                                \x1b[34m│
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
        case "4":
          this.loginPerfilAvancado();
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
    console.clear();
    console.log(`
\x1b[31m╔══════════════════════════════════╗
║                                          ║
║        🌅 Até a próxima! 👋              ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);

    process.exit(0);
  }

  private login(): void {
    console.clear();
    console.log("\n\x1b[34m🔐 Autenticação de Usuário \x1b[0m");
    const apelido = getData("👤 Nome de usuário: ");
    const senha = getData("🔑 Senha: ");

    const perfil: Perfil | undefined = this._redeSocial.buscarPerfil(apelido);

    if (perfil && perfil.stats) {
      if (apelido === perfil.apelido && senha === perfil.senha) {
        console.log(`
\x1b[32m╔══════════════════════════════════════════╗
║                                          ║
║     🎉 Login realizado com sucesso!       ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);

        this._perfilAtual = perfil;
        this._isLoggedIn = true;
        return;
      }
    }

    console.clear();
    console.log(`
    \x1b[34m┌─────────────────────────────────────────┐
    │ 🔐 Opções de Acesso                     │
    ├─────────────────────────────────────────┤
    │ \x1b[33m1\x1b[34m - \x1b[32mLogin                               \x1b[34m│
    │ \x1b[33m2\x1b[34m - \x1b[32mCriar Nova Conta                    \x1b[34m│
    │ \x1b[33m3\x1b[34m - \x1b[33mRecuperar Senha                     \x1b[34m│
    │ \x1b[33m4\x1b[34m - \x1b[35mLogin de Perfil Avançado            \x1b[34m│
    │ \x1b[33m0\x1b[34m - \x1b[31mSair                                \x1b[34m│
    └─────────────────────────────────────────┘\x1b[0m`);
    console.log(`
\x1b[31m╔══════════════════════════════════════════╗
║                                          ║
║   ⚠️ Usuário ou senha inválidos           ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
  }

  private criarConta(): void {
    console.clear();
    console.log("\n\x1b[34m📝 Criar Nova Conta \x1b[0m");

    const apelido = getData("👤 Escolha um nome de usuário: ");
    try {
      validations.possiveisErrosUsername(apelido);
    } catch (error) {
      console.clear();
      console.log(`
        \x1b[34m┌─────────────────────────────────────────┐
        │ 🔐 Opções de Acesso                     │
        ├─────────────────────────────────────────┤
        │ \x1b[33m1\x1b[34m - \x1b[32mLogin                               \x1b[34m│
        │ \x1b[33m2\x1b[34m - \x1b[32mCriar Nova Conta                    \x1b[34m│
        │ \x1b[33m3\x1b[34m - \x1b[33mRecuperar Senha                     \x1b[34m│
        │ \x1b[33m4\x1b[34m - \x1b[35mLogin de Perfil Avançado            \x1b[34m│
        │ \x1b[33m0\x1b[34m - \x1b[31mSair                                \x1b[34m│
        └─────────────────────────────────────────┘\x1b[0m`);
      console.log(`\x1b[31m⚠️ ${error.message}\x1b[0m`);
      return;
    }
    const senha = getData("🔐 Escolha uma senha: ");


    // let senha: string;
    // do {
    //     senha = getData("🔐 Escolha uma senha (mínimo 8 caracteres): ");
    //     try {
    //         vals.validationSenha(senha);
    //         break;
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // } while (true);

    const email = getData("📧 Digite seu email: ");

    console.log("\n🖼️ Escolha sua foto de perfil:");

    console.log("\n🖼️ Escolha sua foto de perfil:");
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
    console.clear();
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
        console.clear();
        console.log(`
          \x1b[34m┌─────────────────────────────────────────┐
          │ 🔐 Opções de Acesso                     │
          ├─────────────────────────────────────────┤
          │ \x1b[33m1\x1b[34m - \x1b[32mLogin                               \x1b[34m│
          │ \x1b[33m2\x1b[34m - \x1b[32mCriar Nova Conta                    \x1b[34m│
          │ \x1b[33m3\x1b[34m - \x1b[33mRecuperar Senha                     \x1b[34m│
          │ \x1b[33m4\x1b[34m - \x1b[35mLogin de Perfil Avançado            \x1b[34m│
          │ \x1b[33m0\x1b[34m - \x1b[31mSair                                \x1b[34m│
          └─────────────────────────────────────────┘\x1b[0m`);
      } else {
        console.clear();
        console.log(`
          \x1b[34m┌─────────────────────────────────────────┐
          │ 🔐 Opções de Acesso                     │
          ├─────────────────────────────────────────┤
          │ \x1b[33m1\x1b[34m - \x1b[32mLogin                               \x1b[34m│
          │ \x1b[33m2\x1b[34m - \x1b[32mCriar Nova Conta                    \x1b[34m│
          │ \x1b[33m3\x1b[34m - \x1b[33mRecuperar Senha                     \x1b[34m│
          │ \x1b[33m4\x1b[34m - \x1b[35mLogin de Perfil Avançado            \x1b[34m│
          │ \x1b[33m0\x1b[34m - \x1b[31mSair                                \x1b[34m│
          └─────────────────────────────────────────┘\x1b[0m`);
        print("Código inserido inválido!");
      }
    }
  }

  private loginPerfilAvancado(): void {
    console.clear();
    console.log("\n\x1b[34m🔐 Login de Perfil Avançado \x1b[0m");
    const apelido = getData("👤 Nome de usuário: ");
    const senha = getData("🔑 Senha: ");


    const perfil: Perfil | undefined = this._redeSocial.buscarPerfil(apelido);

    if (perfil && perfil.stats) {
      // Verifica se é um PerfilAvancado
      if ( PerfilAvancado.isPerfilAvancado(perfil) && apelido === perfil.apelido && senha === perfil.senha) { 
        console.log(`
\x1b[32m╔══════════════════════════════════════════╗
║                                          ║
║     🎉 Login de Perfil Avançado           ║
║        Bem-vindo, Administrador!         ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);


        this._perfilAtual = perfil;
        this._isLoggedIn = true;
        return;
    }
    console.clear();
    console.log(`
      \x1b[34m┌─────────────────────────────────────────┐
      │ 🔐 Opções de Acesso                     │
      ├─────────────────────────────────────────┤
      │ \x1b[33m1\x1b[34m - \x1b[32mLogin                               \x1b[34m│
      │ \x1b[33m2\x1b[34m - \x1b[32mCriar Nova Conta                    \x1b[34m│
      │ \x1b[33m3\x1b[34m - \x1b[33mRecuperar Senha                     \x1b[34m│
      │ \x1b[33m4\x1b[34m - \x1b[35mLogin de Perfil Avançado            \x1b[34m│
      │ \x1b[33m0\x1b[34m - \x1b[31mSair                                \x1b[34m│
      └─────────────────────────────────────────┘\x1b[0m`);
    console.log(`
\x1b[31m╔══════════════════════════════════════════╗
║                                          ║
║   ⚠️ Acesso negado. Perfil não autorizado ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
  }
}

  private criarNovoPerfilAvancado(): void {
    try {
      if (PerfilAvancado.isPerfilAvancado(this._perfilAtual)) {
        console.log("\n\x1b[34m📝 Criar Novo Perfil Avançado \x1b[0m");


        const apelido = getData("👤 Escolha um nome de usuário: ");
        const email = getData("📧 Digite seu email: ");
        const senha = getData("🔐 Escolha uma senha: ");

        const novoPerfilAvancado = PerfilAvancado.criarNovoPerfilAvancado(
          apelido,
          email,
          senha
        );
        this._redeSocial.adicionarPerfil(novoPerfilAvancado);
        salvarDadosPerfis(this._redeSocial.listarPerfis());

        console.log(`
\x1b[32m╔══════════════════════════════════╗
║                                          ║
║     🎉 Perfil Avançado criado com sucesso! ║
║     Bem-vindo, ${apelido}!               ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
      } else {
        console.log(`
\x1b[31m╔═══════════════════════════════════════════════════════════════════════╗
║                                                                               ║
║   ⚠️ Apenas perfis avançados podem criar outros perfis avançados.            ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝\x1b[0m`);
      }
      this.delay(3000)
    } catch (error) {
      console.log(`
\x1b[31m╔══════════════════════════════════════════╗
║                                          ║
║   ❌ Erro ao criar perfil avançado: ${error.message} ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
    }
    this.delay(3000)
  }

  private criarPerfilComum(): void {
    try {
      if (PerfilAvancado.isPerfilAvancado(this._perfilAtual)) {
        console.log("\n\x1b[34m📝 Criar Novo Perfil Comum \x1b[0m");

        const apelido = getData("👤 Escolha um nome de usuário: ");
        const email = getData("📧 Digite seu email: ");
        const senha = getData("🔐 Escolha uma senha: ");

        const novoPerfilComum = new Perfil(
          ulid(),
          apelido,
          email,
          "default.png", // Foto padrão
          senha,
          true,
          [],
          [],
          []
        );
        this._redeSocial.adicionarPerfil(novoPerfilComum);
        salvarDadosPerfis(this._redeSocial.listarPerfis());

        console.log(`
\x1b[32m╔══════════════════════════════════╗
║                                          ║
║     🎉 Perfil Comum criado com sucesso!  ║
║     Bem-vindo, ${apelido}!               ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
      } else {
        console.log(`
\x1b[31m╔══════════════════════════════════════════╗
║                                          ║
║   ⚠️ Apenas perfis avançados podem criar perfis comuns. ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
this.delay(3000)
      }
    } catch (error) {
      console.log(`
\x1b[31m╔══════════════════════════════════════════╗
║                                          ║
║   ❌ Erro ao criar perfil comum: ${error.message} ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
    }
  }

  private criarLinha(
    caractere: string = "-",
    comprimento: number = 40
  ): string {
    return caractere.repeat(comprimento);
  }

  private centralizarTexto(texto: string, largura: number = 40): string {
    const espacosEsquerda = Math.floor((largura - texto.length) / 2);
    const espacosDireita = largura - texto.length - espacosEsquerda;
    return " ".repeat(espacosEsquerda) + texto + " ".repeat(espacosDireita);
  }

  private exibirTitulo(titulo: string): void {
    console.log("\n" + this.criarLinha("="));
    console.log("\n" + this.criarLinha("="));
    console.log(this.centralizarTexto(titulo.toUpperCase()));
    console.log(this.criarLinha("=") + "\n");
    console.log(this.criarLinha("=") + "\n");
  }

  private menuPrincipal(): void {
    console.clear();
    let opcao: string = "";
    let appOn: boolean = true;

    do {
      this.exibirTitulo(`Bem-vindo, ${this._perfilAtual?.apelido}`);


      console.log(`
\x1b[36m┌─────────────────────────────────────────┐
│ 🏠 Menu Principal                       │
├─────────────────────────────────────────┤
│ \x1b[33m1\x1b[36m - \x1b[34mConfigurar Perfil                   \x1b[36m│
│ \x1b[33m2\x1b[36m - \x1b[34mPublicações                         \x1b[36m│
│ \x1b[33m3\x1b[36m - \x1b[34mInterações Sociais                  \x1b[36m│
│ \x1b[33m4\x1b[36m - \x1b[35mGerenciar Perfis                    \x1b[36m│
│ \x1b[33m0\x1b[36m - \x1b[31m↪ Deslogar                          \x1b[36m│
└─────────────────────────────────────────┘\x1b[0m`);

      opcao = getData("\n➤ Escolha uma opção: ");

      switch (opcao) {
        case "1":
          this.menuAlterarPerfil();
          break;
        case "2":
          this.menuPublicacoes();
          break;
        case "3":
          this.menuInteracoesSociais();
          break;
        case "4":
          if (PerfilAvancado.isPerfilAvancado(this._perfilAtual)) {
            this.menuGerenciarPerfis();
          } else {
            console.clear();
            console.log(`
              \x1b[31m╔═════════════════════════════════════════════════════════════════════════╗
              ║                                                                         ║
              ║   ⚠️  Apenas perfis avançados podem acessar o gerenciamento de perfis.   ║
              ║                                                                         ║
              ╚═════════════════════════════════════════════════════════════════════════╝\x1b[0m`);
              this.delay(3000)
          }
          break;
        case "0":
          console.log(`
\x1b[32m╔══════════════════════════════════════════╗
║                                          ║
║     👋 Deslogado com sucesso!           ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);


          this._perfilAtual = null;
          this._isLoggedIn = false;
          appOn = false;
          break;
        default:
          print("\x1b[33m⚠ Opção inválida! Tente novamente. ⚠\x1b[0m");
          break;
      }
    } while (appOn);

    // Volta para a tela de opções de acesso
    this.start();
  }

  private menuPerfil(): void {
    let opcao: string = "";

    do {
      clear();
      this.exibirTitulo("Configurações do Perfil");
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
      this.exibirTitulo("Gerenciamento de Publicações");

      console.log(`

\x1b[36m┌─────────────────────────────────────────┐
│ 📝 Publicações                          │
├─────────────────────────────────────────┤
│ \x1b[33m1\x1b[36m - \x1b[34m➕ Criar Publicação                 \x1b[36m│
│ \x1b[33m2\x1b[36m - \x1b[34m➕ Criar Publicação Avançada        \x1b[36m│
│ \x1b[33m3\x1b[36m - \x1b[34m📋 Listar Minhas Publicações        \x1b[36m│
│ \x1b[33m4\x1b[36m - \x1b[34m✏️  Editar Publicação                \x1b[36m│
│ \x1b[33m5\x1b[36m - \x1b[31m🗑 Excluir Publicação                \x1b[36m│
│ \x1b[33m6\x1b[36m - \x1b[34m👀 Ver Todas Publicações            \x1b[36m│
│ \x1b[33m7\x1b[36m - \x1b[34m👥 Interagir com Publicação         \x1b[36m│
│ \x1b[33m0\x1b[36m - \x1b[32m↩ Voltar                            \x1b[36m│
└─────────────────────────────────────────┘\x1b[0m`);

      opcao = getData("\n➤ Escolha uma opção: ");

      switch (opcao) {
        case "1":
          this.criarPublicacao();
          break;
        case "2":
          this.fazerPublicacaoAvancada();
          this.delay(3000)
          break;
        case "3":
          this.listarMinhasPublicacoes();
          break;
        case "4":
          this.editarPublicacao();
          break;
        case "5":
          this.excluirPublicacao();
          break;
        case "6":
          this.verTodasPublicacoes();
          break;
        case "7":
          this.interagirPublicacaoAvancada();
          break;
        case "0":
          print("\x1b[32m↩ Voltando ao Menu Principal... ↩\x1b[0m");
          break;
        default:
          print("\x1b[33m⚠ Opção inválida! Tente novamente. ⚠\x1b[0m");
          break;
      }
    } while (opcao !== "0");
    console.clear();
  }

  private criarPublicacao(): void {
    const novaPublicacao = this._redeSocial.criarPublicacao(
      this._perfilAtual!.apelido
    );


    if (novaPublicacao) {
      console.log(`
\x1b[32m╔══════════════════════════════════════════╗
║                                          ║
║     🎉 Publicação criada com sucesso!   ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
    } else {
      console.log(`
\x1b[31m╔══════════════════════════════════════════╗
║                                          ║
║     ❌ Erro ao criar publicação         ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
    }


    getData("\nPressione Enter para continuar...");
  }

  private listarMinhasPublicacoes(): void {
    const publicacoes = this._redeSocial.listarPublicacoes(
      this._perfilAtual!.apelido
    );

    if (publicacoes.length === 0) {
      console.log(`
\x1b[33m╔══════════════════════════════════════════╗
║                                          ║
║     📭 Você ainda não tem publicações     ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
    } else {
      console.log("\n🗒️  Minhas Publicações:");
      publicacoes.forEach((pub, index) => {
        console.log(`
\x1b[34m${index + 1}. 📝 ${pub.conteudo}
   📅 ${pub.dataHora.toLocaleString()}
            \x1b[0m`);
      });
    }

    getData("\nPressione Enter para continuar...");
  }

  private editarPublicacao(): void {
    const publicacoes = this._redeSocial.listarPublicacoes(
      this._perfilAtual!.apelido
    );

    if (publicacoes.length === 0) {
      console.log(`
\x1b[33m╔══════════════════════════════════════════╗
║                                          ║
║     📭 Você não tem publicações para      ║
║           editar                         ║
╚══════════════════════════════════════════╝\x1b[0m`);
      getData("\nPressione Enter para continuar...");
      return;
    }

    console.log("\n🗒️  Escolha a publicação para editar:");

    
    publicacoes.forEach((pub, index) => {
      console.log(`\x1b[34m${index + 1}. ${pub.conteudo}\x1b[0m`);
    });

    let escolha

    while (true) {
      escolha = getNumber("\n➤ Escolha o número da publicação: ") - 1;
  
      // Verificar se a entrada é um número e maior ou igual a zero
      if (!isNaN(escolha) && escolha >= 0) {
          break; // Sai do loop se a entrada for válida
      } else {
          console.log("Por favor, insira um número válido.");
      }
  }



    if (escolha < 0 || escolha >= publicacoes.length) {
      print("\x1b[31m⚠️ Publicação inválida! ⚠️\x1b[0m");
      return;
    }

    const publicacaoSelecionada = publicacoes[escolha];
    const novoConteudo = getData("\x1b[34m✏️  Digite o novo conteúdo: \x1b[0m");

    const sucesso = this._redeSocial.editarPublicacao(
      this._perfilAtual!.apelido,
      publicacaoSelecionada.id,
      novoConteudo
    );

    if (sucesso) {
      console.log(`
\x1b[32m╔══════════════════════════════════════════╗
║                                          ║
║     🎉 Publicação editada com sucesso!  ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
    } else {
      console.log(`
\x1b[31m╔══════════════════════════════════════════╗
║                                          ║
║     ❌ Erro ao editar publicação        ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
    }

    getData("\nPressione Enter para continuar...");
  }

  private excluirPublicacao(): void {
    const publicacoes = this._redeSocial.listarPublicacoes(
      this._perfilAtual!.apelido
    );

    if (publicacoes.length === 0) {
      console.log(`
\x1b[33m╔══════════════════════════════════════════╗
║                                          ║
║     📭 Você não tem publicações para      ║
║           excluir                        ║
╚══════════════════════════════════════════╝\x1b[0m`);
      getData("\nPressione Enter para continuar...");
      return;
    }

    console.log("\n🗒️  Escolha a publicação para excluir:");
    publicacoes.forEach((pub, index) => {
      console.log(`\x1b[34m${index + 1}. ${pub.conteudo}\x1b[0m`);
    });

    const escolha = getNumber("\n➤ Digite o número da publicação: ") - 1;

    if (escolha < 0 || escolha >= publicacoes.length) {
      print("\x1b[31m⚠️ Publicação inválida! ⚠️\x1b[0m");
      return;
    }

    const publicacaoSelecionada = publicacoes[escolha];
    const confirmacao = getData(
      "\x1b[31m❗ Tem certeza que deseja excluir esta publicação? (s/n): \x1b[0m"
    );

    if (confirmacao.toLowerCase() === "s") {
      const sucesso = this._redeSocial.deletarPublicacao(
        this._perfilAtual!.apelido,
        publicacaoSelecionada.id
      );

      if (sucesso) {
        console.log(`
\x1b[32m╔══════════════════════════════════════════╗
║                                          ║
║     🗑 Publicação excluída com sucesso!   ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
      } else {
        console.log(`
\x1b[31m╔══════════════════════════════════════════╗
║                                          ║
║     ❌ Erro ao excluir publicação       ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
      }
    } else {
      print("\x1b[32m↩ Operação cancelada. ↩\x1b[0m");
    }

    getData("\nPressione Enter para continuar...");
  }





  private verTodasPublicacoes(): void {
    const publicacoes = this._redeSocial.listarTodasPublicacoes();
    
    if (publicacoes.length === 0) {
      console.log(`
\x1b[33m╔══════════════════════════════════════════╗
║                                          ║
║     📭 Não existem publicações           ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
    } else {
      console.log('\n🗒️  Todas as Publicações:');
      publicacoes.forEach((pub, index) => {
        console.log(`
\x1b[34m${index + 1}. 📝 ${pub.conteudo}
   📅 ${pub.dataHora.toLocaleString()}
   👤 Autor: ${this._redeSocial.buscarPerfilPorID(pub.perfilAssociado)?.apelido || 'Desconhecido'}
      \x1b[0m`);

        // Se for uma PublicacaoAvancada, mostrar interações
        if (pub instanceof PublicacaoAvancada || PublicacaoAvancada.isPublicacaoAvancada(pub)) {
          const publicacaoAvancada = pub instanceof PublicacaoAvancada 
            ? pub 
            : Object.assign(new PublicacaoAvancada(pub.id, pub.conteudo, pub.dataHora, pub.perfilAssociado), pub);
          
          const interacoes = publicacaoAvancada.listarInteracoesDetalhadas();
          const contagemInteracoes = publicacaoAvancada.contarInteracoesPorTipo();

          console.log('\n   📊 Resumo de Interações:');
          console.log(`   👍 Curtir: ${contagemInteracoes[TipoInteracao.Curtir]}`);
          console.log(`   👎 Não Curtir: ${contagemInteracoes[TipoInteracao.NaoCurtir]}`);
          console.log(`   😂 Riso: ${contagemInteracoes[TipoInteracao.Riso]}`);
          console.log(`   😮 Surpresa: ${contagemInteracoes[TipoInteracao.Surpresa]}`);
        }
      });
    }
    
    getData("\nPressione Enter para continuar...");
  }


















  private menuSolicitacoes(): void {
    let opcao: string = "";

    do {
      clear();
      this.exibirTitulo("Gerenciamento de Solicitações");

      console.log(`
\x1b[36m┌─────────────────────────────────────────┐
│ 👥 Solicitações de Amizade               │
├─────────────────────────────────────────┤
│ \x1b[33m1\x1b[36m - \x1b[34m👀 Visualizar Solicitações           \x1b[36m│
│ \x1b[33m2\x1b[36m - \x1b[32m✅ Aceitar Solicitação              \x1b[36m│
│ \x1b[33m3\x1b[36m - \x1b[31m❌ Recusar Solicitação              \x1b[36m│
│ \x1b[33m4\x1b[36m - \x1b[34m➕ Enviar Solicitação               \x1b[36m│
│ \x1b[33m0\x1b[36m - \x1b[32m↩ Voltar                            \x1b[36m│
└─────────────────────────────────────────┘\x1b[0m`);

      opcao = getData("\n➤ Escolha uma opção: ");

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
          print("\x1b[32m↩ Voltando ao Menu Principal... ↩\x1b[0m");
          break;
        default:
          print("\x1b[33m⚠ Opção inválida! Tente novamente. ⚠\x1b[0m");
          break;
      }

      salvarDadosPerfis(this._redeSocial.listarPerfis());
    } while (opcao !== "0");
  }

  private visualizarSolicitacoes(): void {
    const solicitacoes = this._redeSocial.listarSolicitacoes(
      this._perfilAtual!.apelido
    );

    if (solicitacoes.length === 0) {
      console.log(`
\x1b[33m╔══════════════════════════════════════════╗
║                                          ║
║     📭 Você não tem solicitações           ║
║         de amizade                       ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
    } else {
      console.log("\n👥 Solicitações de Amizade:");
      solicitacoes.forEach((solicitacao, index) => {
        console.log(`\x1b[34m${index + 1}. 👤 ${solicitacao}\x1b[0m`);
      });
    }

    getData("\nPressione Enter para continuar...");
  }

  private aceitarSolicitacao(): void {
    const solicitacoes = this._perfilAtual?.solicitacoesAmizade;
    if (solicitacoes) {
      if (solicitacoes.length === 0) {
        console.log(`
\x1b[33m╔══════════════════════════════════════════╗
║                                          ║
║     📭 Você não tem solicitações        ║
║         de amizade                       ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
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
        console.log(`
\x1b[33m╔══════════════════════════════════════════╗
║                                          ║
║     📭 Você não tem solicitações        ║
║         de amizade                       ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
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
    try {
      const usuariosAtuais = this._redeSocial.listarPerfis();
      usuariosAtuais.forEach((perfil, index) => {
        if (perfil["_apelido"] !== this._perfilAtual?.apelido) {
          const isAmigo = this._perfilAtual?.amigos.includes(
            perfil["_apelido"]
          );
          console.log(
            `Id: ${index + 1} - Usuário: ${perfil["_apelido"]}${
              isAmigo ? " (amigos)" : ""
            }`
          );
        }
      });

      const index = getNumber(
        "\nDigite o ID do usuário que deseja adicionar como amigo: "
      );

      // const idPerfil = usuariosAtuais[index - 1]["_id"];
      const apelidoPerfil = usuariosAtuais[index - 1]["_apelido"];

      this._redeSocial.enviarSolicitacao(
        this._perfilAtual!.apelido,
        apelidoPerfil
      );
    } catch (error) {
      console.log(`
\x1b[31m╔══════════════════════════════════════════╗
║                                          ║
║     ❌ Erro ao enviar solicitação        ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
    }


    getData("\nPressione Enter para continuar...");
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
      this.exibirTitulo("Alterar Perfil");

      console.log(`
\x1b[36m┌─────────────────────────────────────────┐
│ 🛠️  Configurações de Perfil              │
├─────────────────────────────────────────┤
│ \x1b[33m1\x1b[36m - \x1b[34m👤 Alterar Apelido                  \x1b[36m│
│ \x1b[33m2\x1b[36m - \x1b[34m📧 Alterar Email                    \x1b[36m│
│ \x1b[33m3\x1b[36m - \x1b[34m🖼️  Alterar Foto                     \x1b[36m│
│ \x1b[33m4\x1b[36m - \x1b[34m🔐 Alterar Senha                    \x1b[36m│
│ \x1b[33m5\x1b[36m - \x1b[31m❌ Desativar Conta                  \x1b[36m│
│ \x1b[33m0\x1b[36m - \x1b[32m↩ Voltar                            \x1b[36m│
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
    console.clear();
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
    console.log("\n🖼️  Escolha sua nova foto de perfil:");
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
    const confirmacao = getData(
      "\x1b[31m❗ Tem certeza que deseja desativar sua conta? (s/n): \x1b[0m"
    );

    if (confirmacao.toLowerCase() === "s") {
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

  private menuInteracoesSociais(): void {
    let opcao: string = "";

    do {
      clear();
      this.exibirTitulo("Interações Sociais");

      console.log(`

\x1b[36m┌─────────────────────────────────────────┐
│ 👥 Interações Sociais                   │
├─────────────────────────────────────────┤
│ \x1b[33m1\x1b[36m - \x1b[34m👀 Visualizar Lista de Amigos       \x1b[36m│
│ \x1b[33m2\x1b[36m - \x1b[31m🗑 Remover Amigo                     \x1b[36m│
│ \x1b[33m3\x1b[36m - \x1b[34m👥 Solicitações de Amizade          \x1b[36m│
│ \x1b[33m0\x1b[36m - \x1b[32m↩ Voltar                            \x1b[36m│
└─────────────────────────────────────────┘\x1b[0m`);

      opcao = getData("\n➤ Escolha uma opção: ");

      switch (opcao) {
        case "1":
          this.visualizarListaAmigos();
          break;
        case "2":
          this.removerAmigo();
          break;
        case "3":
          this.menuSolicitacoes();
          break;
        case "0":
          print("\x1b[32m↩ Voltando ao Menu Principal... ↩\x1b[0m");
          break;
        default:
          print("\x1b[33m⚠ Opção inválida! Tente novamente. ⚠\x1b[0m");
          break;
      }
    } while (opcao !== "0");
    console.clear();
  }

  private visualizarListaAmigos(): void {
    const amigos = this._perfilAtual!.amigos;

    if (amigos.length === 0) {
      console.log(`
\x1b[33m╔══════════════════════════════════════════╗
║                                          ║
║     📭 Você não tem amigos ainda        ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
    } else {
      console.log("\n👥 Seus Amigos:");
      amigos.forEach((amigo, index) => {
        const perfilAmigo = this._redeSocial.buscarPerfil(amigo);
        console.log(`
\x1b[34m${index + 1}. 👤 ${amigo}
   📧 ${perfilAmigo?.email || "Email não disponível"}
   🖼️  ${perfilAmigo?.foto || "Sem foto"}
            \x1b[0m`);
      });
    }

    getData("\nPressione Enter para continuar...");
  }

  private removerAmigo(): void {
    const amigos = this._perfilAtual!.amigos;

    if (amigos.length === 0) {
      console.log(`
\x1b[33m╔══════════════════════════════════════════╗
║                                          ║
║     📭 Você não tem amigos para remover  ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
      getData("\nPressione Enter para continuar...");
      return;
    }

    console.log("\n👥 Escolha um amigo para remover:");
    amigos.forEach((amigo, index) => {
      console.log(`\x1b[34m${index + 1}. 👤 ${amigo}\x1b[0m`);
    });

    const escolha = getNumber("\n➤ Digite o número do amigo: ") - 1;

    if (escolha < 0 || escolha >= amigos.length) {
      print("\x1b[31m⚠️ Amigo inválido! ⚠️\x1b[0m");
      return;
    }

    const amigoParaRemover = amigos[escolha];
    const confirmacao = getData(
      `\x1b[31m❗ Tem certeza que deseja remover ${amigoParaRemover}? (s/n): \x1b[0m`
    );

    if (confirmacao.toLowerCase() === "s") {
      // Remove o amigo do perfil atual
      this._perfilAtual!.removerAmigo(amigoParaRemover);

      // Remove o perfil atual da lista de amigos do outro usuário
      const perfilAmigo = this._redeSocial.buscarPerfil(amigoParaRemover);
      if (perfilAmigo) {
        perfilAmigo.removerAmigo(this._perfilAtual!.apelido);
      }

      salvarDadosPerfis(this._redeSocial.listarPerfis());

      console.log(`
\x1b[32m╔══════════════════════════════════════════╗
║                                          ║
║     🗑 Amigo removido com sucesso!      ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
    } else {
      print("\x1b[32m↩ Operação cancelada. ↩\x1b[0m");
    }

    getData("\nPressione Enter para continuar...");
  }

  private editarPerfilComum(): void {
    if (PerfilAvancado.isPerfilAvancado(this._perfilAtual)) {
      const apelido = getData("👤 Apelido do perfil a ser editado: ");
      const perfil = this._redeSocial.buscarPerfil(apelido);

      if (perfil) {
        const novoApelido = getData("👤 Novo apelido: ");
        const novoEmail = getData("📧 Novo email: ");
        this._perfilAtual!.editarPerfilComum(perfil, novoApelido, novoEmail);
        salvarDadosPerfis(this._redeSocial.listarPerfis());

        console.log(`
\x1b[32m╔══════════════════════════════════╗
║                                          ║
║     🎉 Perfil Comum editado com sucesso! ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
      } else {
        console.log(`
\x1b[31m╔══════════════════════════════════════════╗
║                                          ║
║   ⚠️ Perfil não encontrado.               ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
      }
    } else {
      console.log(`
\x1b[31m╔══════════════════════════════════════════╗
║                                          ║
║   ⚠️ Apenas perfis avançados podem editar perfis comuns. ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
  this.delay(3000)
    }
  }

  private excluirPerfilComum(): void {
    if (PerfilAvancado.isPerfilAvancado(this._perfilAtual)) {
      const apelido = getData("👤 Apelido do perfil a ser excluído: ");
      const perfil = this._redeSocial.buscarPerfil(apelido);

      if (perfil) {
        this._redeSocial.removerPerfil(apelido);
        salvarDadosPerfis(this._redeSocial.listarPerfis());

        console.log(`
\x1b[32m╔══════════════════════════════════╗
║                                          ║
║     🗑 Perfil Comum excluído com sucesso! ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
      } else {
        console.log(`
\x1b[31m╔══════════════════════════════════════════╗
║                                          ║
║   ⚠️ Perfil não encontrado.               ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
      }
      this.delay(3000)
    } else {
      console.log(`
\x1b[31m╔══════════════════════════════════════════╗
║                                          ║
║   ⚠️ Apenas perfis avançados podem excluir perfis comuns. ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
this.delay(3000)}
  }

  private menuGerenciarPerfis(): void {
    let opcao: string = "";
    let gerenciarOn: boolean = true;

    do {
      clear();
      this.exibirTitulo("Gerenciar Perfis");


      console.log(`
\x1b[36m┌─────────────────────────────────────────┐
│ 🔧 Gerenciar Perfis                     │
├─────────────────────────────────────────┤
│ \x1b[33m1\x1b[36m - \x1b[34mCriar Perfil Avançado               \x1b[36m│
│ \x1b[33m2\x1b[36m - \x1b[34mCriar Perfil Comum                  \x1b[36m│
│ \x1b[33m3\x1b[36m - \x1b[34mEditar Perfil Comum                 \x1b[36m│
│ \x1b[33m4\x1b[36m - \x1b[34mExcluir Perfil Comum                \x1b[36m│
│ \x1b[33m5\x1b[36m - \x1b[34mFazer Publicação Avançada           \x1b[36m│
│ \x1b[33m0\x1b[36m - \x1b[31m↪ Voltar                            \x1b[36m│
└─────────────────────────────────────────┘\x1b[0m`);

      opcao = getData("\n➤ Escolha uma opção: ");

      switch (opcao) {
        case "1":
          this.criarNovoPerfilAvancado();
          break;
        case "2":
          this.criarPerfilComum();
          break;
        case "3":
          this.editarPerfilComum();
          break;
        case "4":
          this.excluirPerfilComum();
          break;
        case "5":
          this.fazerPublicacaoAvancada();
          break;
        case "0":
          gerenciarOn = false;
          break;
        default:
          print("\x1b[33m⚠ Opção inválida! Tente novamente. ⚠\x1b[0m");
          break;
      }
    } while (gerenciarOn);
  }

  private fazerPublicacaoAvancada(): void {
    try {
      if (PerfilAvancado.isPerfilAvancado(this._perfilAtual)) {
        console.log("\n\x1b[34m📝 Fazer Publicação Avançada \x1b[0m");

        const conteudo = getData("✍️ Digite o conteúdo da publicação: ");
        const novaPublicacao = new PublicacaoAvancada(
          "SUPER" + ulid(),
          conteudo,
          new Date(),
          this._perfilAtual!.id
        );

        this._redeSocial.adicionarPublicacao(novaPublicacao);
        salvarDadosPublicacoes(this._redeSocial.listarTodasPublicacoes());

        console.log(`
\x1b[32m╔══════════════════════════════════╗
║                                          ║
║     🎉 Publicação Avançada criada com sucesso! ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
      } else {
        console.log(`
\x1b[31m╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║   ⚠️ Apenas perfis avançados podem fazer publicações avançadas.   ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝\x1b[0m`);
this.delay(3000)}
    } catch (error) {
      console.log(`
\x1b[31m╔══════════════════════════════════════════╗
║                                          ║
║   ❌ Erro ao criar publicação avançada: ${error.message} ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
this.delay(3000)}
  }

  private interagirPublicacaoAvancada(): void {
    try {
      if (PerfilAvancado.isPerfilAvancado(this._perfilAtual)) {
        console.log("\n\x1b[34m👥 Interagir com Publicação Avançada \x1b[0m");

        // Listar todas as publicações avançadas
        const publicacoesAvancadas = this._redeSocial
          .listarTodasPublicacoes()
          .filter(
            (pub) =>
              pub instanceof PublicacaoAvancada ||
              PublicacaoAvancada.isPublicacaoAvancada(pub)
          );

        if (publicacoesAvancadas.length === 0) {
          console.log(`
\x1b[33m╔══════════════════════════════════════════╗
║                                          ║
║   ⚠️ Não existem publicações avançadas   ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
          return;
        }

        // Mostrar publicações avançadas disponíveis
        console.log("\n📋 Publicações Avançadas Disponíveis:");
        publicacoesAvancadas.forEach((pub, index) => {
          console.log(
            `\x1b[34m${index + 1}. ${pub.conteudo.substring(0, 50)}...\x1b[0m`
          );
        });

        // Selecionar publicação para interagir
        let escolhaPublicacao

        while (true) {
          escolhaPublicacao = getNumber("\n➤ Escolha o número da publicação: ") - 1;
      
          // Verificar se a entrada é um número e maior ou igual a zero
          if (!isNaN(escolhaPublicacao) && escolhaPublicacao >= 0) {
              break; // Sai do loop se a entrada for válida
          } else {
              console.log("Por favor, insira um número válido.");
          }
      }
        

        if (
          escolhaPublicacao < 0 ||
          escolhaPublicacao >= publicacoesAvancadas.length
        ) {
          console.log(`
\x1b[31m╔══════════════════════════════════════════╗
║                                          ║
║   ⚠️ Publicação inválida                 ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
          return;
        }

        // Escolher tipo de interação
        console.log(`
\x1b[36m┌─────────────────────────────────────────┐
│ 👍 Tipos de Interação                   │
├─────────────────────────────────────────┤
│ \x1b[33m1\x1b[36m - \x1b[34m👍 Curtir                        \x1b[36m│
│ \x1b[33m2\x1b[36m - \x1b[34m👎 Não Curtir                   \x1b[36m│
│ \x1b[33m3\x1b[36m - \x1b[34m😂 Riso                         \x1b[36m│
│ \x1b[33m4\x1b[36m - \x1b[34m😮 Surpresa                     \x1b[36m│
└─────────────────────────────────────────┘\x1b[0m`);

        const escolhaInteracao = getNumber("\n➤ Escolha o tipo de interação: ");

        let tipoInteracao: TipoInteracao;
        switch (escolhaInteracao) {
          case 1:
            tipoInteracao = TipoInteracao.Curtir;
            break;
          case 2:
            tipoInteracao = TipoInteracao.NaoCurtir;
            break;
          case 3:
            tipoInteracao = TipoInteracao.Riso;
            break;
          case 4:
            tipoInteracao = TipoInteracao.Surpresa;
            break;
          default:
            console.log(`
\x1b[31m╔══════════════════════════════════════════╗
║                                          ║
║   ⚠️ Interação inválida                  ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
            return;
        }

        // Criar interação
        const novaInteracao = new Interacao(
          ulid(),
          tipoInteracao,
          this._perfilAtual!.apelido
        );

        // Adicionar interação à publicação avançada
        const publicacaoSelecionada = publicacoesAvancadas[
          escolhaPublicacao
        ] as PublicacaoAvancada;
        publicacaoSelecionada.adicionarInteracao(novaInteracao);

        // Salvar publicações
        salvarDadosPublicacoes(this._redeSocial.listarTodasPublicacoes());

        console.log(`
\x1b[32m╔══════════════════════════════════╗
║                                          ║
║     🎉 Interação adicionada com sucesso! ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
      } else {
        console.log(`
\x1b[31m╔══════════════════════════════════════════╗
║                                          ║
║   ⚠️ Apenas perfis avançados podem interagir com publicações. ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
this.delay(3000)
      }
    } catch (error) {
      console.log(`
\x1b[31m╔══════════════════════════════════════════╗
║                                          ║
║   ❌ Erro ao interagir com publicação: ${error.message} ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
    }
  }

  delay(ms) {
    const start = Date.now();
    while (Date.now() - start < ms) {
        // Espera ativamente
    }
  }
}

const app: App = new App();
app.start();

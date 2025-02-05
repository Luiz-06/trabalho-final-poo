"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var perfil_1 = require("./models/perfil");
var redeSocial_1 = require("./models/redeSocial");
var auxFunctions_1 = require("./utils/auxFunctions");
var validations = require("./validations/validations");
var ulid_1 = require("ulid");
var App = /** @class */ (function () {
    function App() {
        this._isLoggedIn = false;
        this._perfilAtual = null;
        this._redeSocial = new redeSocial_1.RedeSocial();
    }
    App.prototype.start = function () {
        while (!this._isLoggedIn) {
            console.log("\nBem vindo \u00E0 Rede Social!\nPor favor, escolha uma das op\u00E7\u00F5es abaixo para continuar:\n1 - Login\n2 - Criar Conta\n3 - Recuperar Senha\n0 - Sair\n      ");
            var opcao = (0, auxFunctions_1.getData)("Digite a opção desejada: ");
            switch (opcao) {
                case "1":
                    this.login();
                    break;
                case "2":
                    this.criarConta();
                    (0, auxFunctions_1.salvarDadosPerfis)(this._redeSocial.listarPerfis());
                    break;
                case "3":
                    this.recuperarSenha();
                    break;
                case "4": // remover essa merda, so ta pq sou preguiçoso
                    var perfil = this._redeSocial.buscarPerfil("1");
                    if (perfil) {
                        (0, auxFunctions_1.print)("Login realizado com sucesso!");
                        this._perfilAtual = perfil;
                        this._isLoggedIn = true;
                    }
                    break;
                case "0":
                    (0, auxFunctions_1.print)("Aplicação encerrada!");
                    return;
                default:
                    (0, auxFunctions_1.print)("Opção inválida! Tente novamente.");
            }
        }
        this.menuPrincipal();
    };
    App.prototype.login = function () {
        var apelido = (0, auxFunctions_1.getData)("Digite seu nome de usuário: ");
        var senha = (0, auxFunctions_1.getData)("Digite sua senha: ");
        var perfil = this._redeSocial.buscarPerfil(apelido);
        if (perfil && perfil.stats) {
            if (apelido === perfil.apelido && senha === perfil.senha) {
                (0, auxFunctions_1.print)("Login realizado com sucesso!");
                this._perfilAtual = perfil;
                this._isLoggedIn = true;
                return;
            }
        }
        console.log("Usuário ou senha inválidos. Tente novamente.");
        // fiz isso para que quando nao haja perfil, o usuário não saiba disso, porque se ele soubesse ele poderia testar ate descobrir usuários que existem
    };
    App.prototype.criarConta = function () {
        var apelido = (0, auxFunctions_1.getData)("Escolha um nome de usuário: ");
        validations.possiveisErrosUsername(apelido);
        var senha = (0, auxFunctions_1.getData)("Escolha uma senha: ");
        var email = (0, auxFunctions_1.getData)("Digite seu email: ");
        var foto = (0, auxFunctions_1.choosePhoto)();
        var novoPerfil = new perfil_1.Perfil((0, ulid_1.ulid)(), apelido, email, foto, senha, true, [], [], []);
        this._redeSocial.adicionarPerfil(novoPerfil);
        (0, auxFunctions_1.print)("Conta criada com sucesso! Bem-vindo, ".concat(apelido, "!"));
        this._isLoggedIn = true;
        this._perfilAtual = novoPerfil;
    };
    App.prototype.recuperarSenha = function () {
        var apelido = (0, auxFunctions_1.getData)("Digite o seu apelido: ");
        var perfilDesejado = this._redeSocial.buscarPerfil(apelido);
        if (perfilDesejado) {
            var emailAssociado = perfilDesejado === null || perfilDesejado === void 0 ? void 0 : perfilDesejado.email;
            (0, auxFunctions_1.print)("Um e-mail de recupera\u00E7\u00E3o foi enviado para ".concat(emailAssociado, ". Verifique sua caixa de entrada!"));
            var codRecuperacao = (0, auxFunctions_1.getData)("Digite o código que foi enviado para seu email: ");
            if (codRecuperacao === "1234") {
                var novaSenha = (0, auxFunctions_1.getData)("Insira sua nova senha: ");
                perfilDesejado.senha = novaSenha;
            }
            else {
                (0, auxFunctions_1.print)("Código inserido inválido!");
            }
        }
    };
    App.prototype.menuPrincipal = function () {
        var _a;
        var opcao = "";
        var appOn = true;
        do {
            (0, auxFunctions_1.clear)();
            console.log("\n\nBem vindo ".concat((_a = this._perfilAtual) === null || _a === void 0 ? void 0 : _a.apelido, "\nMenu Principal:\n1 - Configura\u00E7\u00F5es do Perfil\n2 - Publica\u00E7\u00F5es\n3 - Solicita\u00E7\u00F5es\n0 - Sair\n      "));
            opcao = (0, auxFunctions_1.getData)("Digite a opção desejada: ");
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
                    (0, auxFunctions_1.print)("Você saiu do sistema. Até logo!");
                    appOn = false;
                    break;
                default:
                    (0, auxFunctions_1.print)("Opção inválida! Tente novamente.");
                    break;
            }
        } while (appOn === true);
    };
    App.prototype.menuPerfil = function () {
        var opcao = "";
        do {
            (0, auxFunctions_1.clear)();
            console.log("\n\nConfigura\u00E7\u00F5es do Perfil:\n1 - Visualizar Perfil\n2 - Alterar Perfil\n3 - Deletar Perfil\n0 - Voltar ao Menu Principal\n      ");
            opcao = (0, auxFunctions_1.getData)("Digite a opção desejada: ");
            switch (opcao) {
                case "1":
                    this.acessarPerfil();
                    break;
                case "2":
                    this.menuAlterarPerfil();
                    break;
                case "3":
                    if (validations.validationTrocarSenha(this._perfilAtual.senha)) {
                        (0, auxFunctions_1.print)("Deletando perfil...");
                        this._redeSocial.desativarPerfil(this._perfilAtual.apelido);
                        this._perfilAtual = null;
                        this._isLoggedIn = false;
                        (0, auxFunctions_1.salvarDadosPerfis)(this._redeSocial.listarPerfis());
                        (0, auxFunctions_1.print)("...");
                        (0, auxFunctions_1.print)("...");
                        (0, auxFunctions_1.print)("Perfil Deletado!\n");
                        (0, auxFunctions_1.clear)();
                        this.start();
                    }
                    return;
                case "0":
                    (0, auxFunctions_1.print)("Voltando ao Menu Principal...");
                    break;
                default:
                    (0, auxFunctions_1.print)("Opção inválida! Tente novamente.");
                    break;
            }
        } while (opcao !== "0");
    };
    App.prototype.menuPublicacoes = function () {
        var opcao = "";
        do {
            (0, auxFunctions_1.clear)();
            console.log("\n\nPublica\u00E7\u00F5es:\n1 - Visualizar Publica\u00E7\u00E3o\n2 - Criar Publica\u00E7\u00E3o\n3 - Alterar Publica\u00E7\u00E3o\n4 - Deletar Publica\u00E7\u00E3o\n5 - Visualizar Minhas Publica\u00E7\u00F5es\n\n0 - Voltar ao Menu Principal\n      ");
            opcao = (0, auxFunctions_1.getData)("Digite a opção desejada: ");
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
                    (0, auxFunctions_1.print)("Voltando ao Menu Principal...");
                    break;
                default:
                    (0, auxFunctions_1.print)("Opção inválida! Tente novamente.");
                    break;
            }
            (0, auxFunctions_1.salvarDadosPublicacoes)(this._redeSocial.listarTodasPublicacoes());
        } while (opcao !== "0");
    };
    App.prototype.menuSolicitacoes = function () {
        var opcao = "";
        do {
            (0, auxFunctions_1.clear)();
            console.log("\n\nSolicita\u00E7\u00F5es:\n1 - Visualizar Solicita\u00E7\u00F5es\n2 - Aceitar Solicita\u00E7\u00E3o\n3 - Recusar Solicita\u00E7\u00E3o\n0 - Voltar ao Menu Principal\n      ");
            opcao = (0, auxFunctions_1.getData)("Digite a opção desejada: ");
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
                    (0, auxFunctions_1.print)("Voltando ao Menu Principal...");
                    break;
                default:
                    (0, auxFunctions_1.print)("Opção inválida! Tente novamente.");
                    break;
            }
        } while (opcao !== "0");
    };
    App.prototype.acessarPerfil = function () {
        if (this._perfilAtual) {
            (0, auxFunctions_1.print)(this._perfilAtual.toString());
        }
    };
    App.prototype.alterarPerfil = function () { };
    App.prototype.menuAlterarPerfil = function () {
        var opcao = "";
        do {
            (0, auxFunctions_1.clear)();
            (0, auxFunctions_1.print)("\nO que deseja alterar?\n1 - Apelido\n2 - Email\n3 - Foto\n4 - Senha\n5 - Desativar conta\n0 - Voltar\n      ");
            opcao = (0, auxFunctions_1.getData)("Digite a opção desejada: ");
            switch (opcao) {
                case "1":
                    var novoApelido = (0, auxFunctions_1.getData)("Insira o novo apelido: ");
                    if (validations.validationTrocarApelido(novoApelido)) {
                        this._perfilAtual.apelido = novoApelido;
                        (0, auxFunctions_1.salvarDadosPerfis)(this._redeSocial.listarPerfis());
                        (0, auxFunctions_1.print)("Apelido trocado com sucesso");
                    }
                    break;
                case "2":
                    var novoEmail = (0, auxFunctions_1.getData)("Insira o novo email: ");
                    if (validations.validationEmail(novoEmail)) {
                        this._perfilAtual.apelido = novoEmail;
                        (0, auxFunctions_1.salvarDadosPerfis)(this._redeSocial.listarPerfis());
                        (0, auxFunctions_1.print)("Email alterado com sucesso");
                    }
                    break;
                case "3":
                    var novaFoto = (0, auxFunctions_1.choosePhoto)();
                    this._perfilAtual.foto = novaFoto;
                    (0, auxFunctions_1.salvarDadosPerfis)(this._redeSocial.listarPerfis());
                    break;
                case "4":
                    if (validations.validationTrocarSenha(this._perfilAtual.senha)) {
                        var novaSenha = (0, auxFunctions_1.getData)("Insira o nova senha: ");
                        this._perfilAtual.senha = novaSenha;
                        (0, auxFunctions_1.salvarDadosPerfis)(this._redeSocial.listarPerfis());
                        (0, auxFunctions_1.print)("Senha alterada com sucesso");
                    }
                    break;
                case "5":
                    this._perfilAtual.stats = false;
                    (0, auxFunctions_1.print)("Perfil desativado!");
                    break;
                case "0":
                    (0, auxFunctions_1.print)("Voltando ao Menu Principal...");
                    break;
                default:
                    (0, auxFunctions_1.print)("Opção inválida! Tente novamente.");
                    break;
            }
        } while (opcao !== "0");
    };
    App.prototype.visualizarPublicacao = function () {
        var _this = this;
        var publicacoes = this._redeSocial.listarTodasPublicacoes();
        publicacoes.forEach(function (publicacao) {
            var perfil = _this._redeSocial.buscarPerfilPorID(publicacao["_perfilAssociado"]);
            console.log("Usuario: ".concat(perfil.apelido, ", Conte\u00FAdo: ").concat(publicacao["_conteudo"]));
        });
    };
    App.prototype.visualizarMinhasPublicacoes = function () {
        var _this = this;
        var minhasPublicacoes = this._redeSocial.listarPublicacoes(this._perfilAtual.apelido);
        minhasPublicacoes.forEach(function (publicacao) {
            var perfil = _this._redeSocial.buscarPerfilPorID(publicacao["_perfilAssociado"]);
            console.log("Usuario: ".concat(perfil.apelido, ", Conte\u00FAdo: ").concat(publicacao["_conteudo"]));
        });
    };
    App.prototype.criarPublicacao = function () {
        (0, auxFunctions_1.print)("Criando publicação...");
        var pub = this._redeSocial.criarPublicacao(this._perfilAtual.apelido);
        if (pub)
            (0, auxFunctions_1.salvarDadosPublicacoes)(this._redeSocial.listarTodasPublicacoes());
        (0, auxFunctions_1.salvarDadosPerfis)(this._redeSocial.listarPerfis());
    };
    App.prototype.alterarPublicacao = function () {
        var _a;
        var publicacoes = (_a = this._perfilAtual) === null || _a === void 0 ? void 0 : _a.publicacoes;
        if (publicacoes) {
            if (publicacoes.length === 0) {
                (0, auxFunctions_1.print)("Você não tem publicações para alterar");
                return;
            }
            (0, auxFunctions_1.print)("\nSuas publicações:");
            publicacoes.forEach(function (pub, index) {
                (0, auxFunctions_1.print)("ID: ".concat(index + 1));
                (0, auxFunctions_1.print)("Conte\u00FAdo: ".concat(pub["_conteudo"]));
                (0, auxFunctions_1.print)("-----------------------");
            });
            var index = (0, auxFunctions_1.getNumber)("\nDigite o ID da publicação que deseja alterar: ");
            var idPublicacao = publicacoes[index - 1]["_id"];
            var novoConteudo = (0, auxFunctions_1.getData)("Digite o novo conteúdo: ");
            this._redeSocial.editarPublicacao(this._perfilAtual.apelido, idPublicacao, novoConteudo);
        }
    };
    App.prototype.deletarPublicacao = function () {
        var _a;
        var publicacoes = (_a = this._perfilAtual) === null || _a === void 0 ? void 0 : _a.publicacoes;
        if (publicacoes) {
            if (publicacoes.length === 0) {
                (0, auxFunctions_1.print)("Você não tem publicações para deletar");
                return;
            }
            (0, auxFunctions_1.print)("\nSuas publicações:");
            publicacoes.forEach(function (pub, index) {
                (0, auxFunctions_1.print)("ID: ".concat(index + 1));
                (0, auxFunctions_1.print)("Conte\u00FAdo: ".concat(pub["_conteudo"]));
                (0, auxFunctions_1.print)("-----------------------");
            });
            var index = (0, auxFunctions_1.getNumber)("\nDigite o ID da publicação que deseja deletar: ");
            var idPublicacao = publicacoes[index - 1]["_id"];
            this._redeSocial.deletarPublicacao(this._perfilAtual.apelido, idPublicacao);
        }
    };
    App.prototype.visualizarSolicitacoes = function () {
        (0, auxFunctions_1.print)("Visualizando solicitações...");
    };
    App.prototype.aceitarSolicitacao = function () {
        (0, auxFunctions_1.print)("Aceitando solicitação...");
    };
    App.prototype.recusarSolicitacao = function () {
        (0, auxFunctions_1.print)("Recusando solicitação...");
    };
    return App;
}());
var app = new App();
app.start();

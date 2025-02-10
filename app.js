"use strict";
exports.__esModule = true;
exports.App = void 0;
var perfil_1 = require("./models/perfil");
var redeSocial_1 = require("./models/redeSocial");
var auxFunctions_1 = require("./utils/auxFunctions");
var validations = require("./validations/validations");
var perfilAvancado_1 = require("./models/perfilAvancado");
var publicacaoAvancada_1 = require("./models/publicacaoAvancada");
var ulid_1 = require("ulid");
var interacao_1 = require("./models/interacao");
var tipoInteracao_1 = require("./models/tipoInteracao");
var child_process_1 = require("child_process");
if (process.platform === "win32") {
    (0, child_process_1.execSync)("chcp 65001 > nul");
}
var App = /** @class */ (function () {
    function App() {
        this._isLoggedIn = false;
        this._perfilAtual = null;
        this._redeSocial = new redeSocial_1.RedeSocial();
        // Adiciona perfil de administrador se não existir
        var perfilAdm = this._redeSocial.buscarPerfil("adm");
        if (!perfilAdm) {
            var novoPerfilAdm = perfilAvancado_1.PerfilAvancado.criarPerfilAdministrador();
            this._redeSocial.adicionarPerfil(novoPerfilAdm);
            (0, auxFunctions_1.salvarDadosPerfis)(this._redeSocial.listarPerfis());
        }
    }
    App.prototype.start = function () {
        console.clear();
        console.log("\n      \u001B[36m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n      \u2551 \uD83C\uDF10 Bem-vindo \u00E0 Rede Social Interativa \uD83C\uDF10 \u2551\n      \u2560\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2563\n      \u2551                                          \u2551\n      \u2551 \u001B[33m\u2728 Conecte-se, Compartilhe, Interaja! \u2728\u001B[36m \u2551\n      \u2551                                          \u2551\n      \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
        console.log("\n      \u001B[34m\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n      \u2502 \uD83D\uDD10 Op\u00E7\u00F5es de Acesso                     \u2502\n      \u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524\n      \u2502 \u001B[33m1\u001B[34m - \u001B[32mLogin                               \u001B[34m\u2502\n      \u2502 \u001B[33m2\u001B[34m - \u001B[32mCriar Nova Conta                    \u001B[34m\u2502\n      \u2502 \u001B[33m3\u001B[34m - \u001B[33mRecuperar Senha                     \u001B[34m\u2502\n      \u2502 \u001B[33m4\u001B[34m - \u001B[35mLogin de Perfil Avan\u00E7ado            \u001B[34m\u2502\n      \u2502 \u001B[33m0\u001B[34m - \u001B[31mSair                                \u001B[34m\u2502\n      \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\u001B[0m");
        while (!this._isLoggedIn) {
            var opcao = (0, auxFunctions_1.getData)("\n➤ Escolha uma opção: ");
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
                case "4":
                    this.loginPerfilAvancado();
                    break;
                case "0":
                    this.sairDoSistema();
                    return;
                default:
                    (0, auxFunctions_1.print)("\x1b[33m⚠ Opção inválida! Tente novamente. ⚠\x1b[0m");
            }
        }
        this.menuPrincipal();
    };
    App.prototype.sairDoSistema = function () {
        console.clear();
        console.log("\n\u001B[31m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551        \uD83C\uDF05 At\u00E9 a pr\u00F3xima! \uD83D\uDC4B              \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
        process.exit(0);
    };
    App.prototype.login = function () {
        console.clear();
        console.log("\n\x1b[34m🔐 Autenticação de Usuário \x1b[0m");
        var apelido = (0, auxFunctions_1.getData)("👤 Nome de usuário: ");
        var senha = (0, auxFunctions_1.getData)("🔑 Senha: ");
        var perfil = this._redeSocial.buscarPerfil(apelido);
        if (perfil && perfil.stats) {
            if (apelido === perfil.apelido && senha === perfil.senha) {
                console.log("\n\u001B[32m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551     \uD83C\uDF89 Login realizado com sucesso!       \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
                this._perfilAtual = perfil;
                this._isLoggedIn = true;
                return;
            }
        }
        console.clear();
        console.log("\n    \u001B[34m\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n    \u2502 \uD83D\uDD10 Op\u00E7\u00F5es de Acesso                     \u2502\n    \u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524\n    \u2502 \u001B[33m1\u001B[34m - \u001B[32mLogin                               \u001B[34m\u2502\n    \u2502 \u001B[33m2\u001B[34m - \u001B[32mCriar Nova Conta                    \u001B[34m\u2502\n    \u2502 \u001B[33m3\u001B[34m - \u001B[33mRecuperar Senha                     \u001B[34m\u2502\n    \u2502 \u001B[33m4\u001B[34m - \u001B[35mLogin de Perfil Avan\u00E7ado            \u001B[34m\u2502\n    \u2502 \u001B[33m0\u001B[34m - \u001B[31mSair                                \u001B[34m\u2502\n    \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\u001B[0m");
        console.log("\n\u001B[31m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551   \u26A0\uFE0F Usu\u00E1rio ou senha inv\u00E1lidos           \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
    };
    App.prototype.criarConta = function () {
        console.clear();
        console.log("\n\x1b[34m📝 Criar Nova Conta \x1b[0m");
        var apelido = (0, auxFunctions_1.getData)("👤 Escolha um nome de usuário: ");
        try {
            validations.possiveisErrosUsername(apelido);
        }
        catch (error) {
            console.clear();
            console.log("\n        \u001B[34m\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n        \u2502 \uD83D\uDD10 Op\u00E7\u00F5es de Acesso                     \u2502\n        \u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524\n        \u2502 \u001B[33m1\u001B[34m - \u001B[32mLogin                               \u001B[34m\u2502\n        \u2502 \u001B[33m2\u001B[34m - \u001B[32mCriar Nova Conta                    \u001B[34m\u2502\n        \u2502 \u001B[33m3\u001B[34m - \u001B[33mRecuperar Senha                     \u001B[34m\u2502\n        \u2502 \u001B[33m4\u001B[34m - \u001B[35mLogin de Perfil Avan\u00E7ado            \u001B[34m\u2502\n        \u2502 \u001B[33m0\u001B[34m - \u001B[31mSair                                \u001B[34m\u2502\n        \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\u001B[0m");
            console.log("\u001B[31m\u26A0\uFE0F ".concat(error.message, "\u001B[0m"));
            return;
        }
        var senha = (0, auxFunctions_1.getData)("🔐 Escolha uma senha: ");
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
        var email = (0, auxFunctions_1.getData)("📧 Digite seu email: ");
        console.log("\n🖼️ Escolha sua foto de perfil:");
        console.log("\n🖼️ Escolha sua foto de perfil:");
        var foto = (0, auxFunctions_1.choosePhoto)();
        var novoPerfil = new perfil_1.Perfil((0, ulid_1.ulid)(), apelido, email, foto, senha, true, [], [], []);
        this._redeSocial.adicionarPerfil(novoPerfil);
        console.log("\n\u001B[32m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551     \uD83C\uDF89 Conta criada com sucesso!         \u2551\n\u2551     Bem-vindo, ".concat(apelido, "!               \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m"));
        this._isLoggedIn = true;
        this._perfilAtual = novoPerfil;
    };
    App.prototype.recuperarSenha = function () {
        console.clear();
        var apelido = (0, auxFunctions_1.getData)("Digite o seu apelido: ");
        var perfilDesejado = this._redeSocial.buscarPerfil(apelido);
        if (perfilDesejado) {
            var emailAssociado = perfilDesejado === null || perfilDesejado === void 0 ? void 0 : perfilDesejado.email;
            (0, auxFunctions_1.print)("Um e-mail de recupera\u00E7\u00E3o foi enviado para ".concat(emailAssociado, ". Verifique sua caixa de entrada!"));
            var codRecuperacao = (0, auxFunctions_1.getData)("Digite o código que foi enviado para seu email: ");
            if (codRecuperacao === "1234") {
                var novaSenha = (0, auxFunctions_1.getData)("Insira sua nova senha: ");
                perfilDesejado.senha = novaSenha;
                console.clear();
                console.log("\n          \u001B[34m\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n          \u2502 \uD83D\uDD10 Op\u00E7\u00F5es de Acesso                     \u2502\n          \u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524\n          \u2502 \u001B[33m1\u001B[34m - \u001B[32mLogin                               \u001B[34m\u2502\n          \u2502 \u001B[33m2\u001B[34m - \u001B[32mCriar Nova Conta                    \u001B[34m\u2502\n          \u2502 \u001B[33m3\u001B[34m - \u001B[33mRecuperar Senha                     \u001B[34m\u2502\n          \u2502 \u001B[33m4\u001B[34m - \u001B[35mLogin de Perfil Avan\u00E7ado            \u001B[34m\u2502\n          \u2502 \u001B[33m0\u001B[34m - \u001B[31mSair                                \u001B[34m\u2502\n          \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\u001B[0m");
            }
            else {
                console.clear();
                console.log("\n          \u001B[34m\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n          \u2502 \uD83D\uDD10 Op\u00E7\u00F5es de Acesso                     \u2502\n          \u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524\n          \u2502 \u001B[33m1\u001B[34m - \u001B[32mLogin                               \u001B[34m\u2502\n          \u2502 \u001B[33m2\u001B[34m - \u001B[32mCriar Nova Conta                    \u001B[34m\u2502\n          \u2502 \u001B[33m3\u001B[34m - \u001B[33mRecuperar Senha                     \u001B[34m\u2502\n          \u2502 \u001B[33m4\u001B[34m - \u001B[35mLogin de Perfil Avan\u00E7ado            \u001B[34m\u2502\n          \u2502 \u001B[33m0\u001B[34m - \u001B[31mSair                                \u001B[34m\u2502\n          \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\u001B[0m");
                (0, auxFunctions_1.print)("Código inserido inválido!");
            }
        }
    };
    App.prototype.loginPerfilAvancado = function () {
        console.clear();
        console.log("\n\x1b[34m🔐 Login de Perfil Avançado \x1b[0m");
        var apelido = (0, auxFunctions_1.getData)("👤 Nome de usuário: ");
        var senha = (0, auxFunctions_1.getData)("🔑 Senha: ");
        var perfil = this._redeSocial.buscarPerfil(apelido);
        if (perfil && perfil.stats) {
            // Verifica se é um PerfilAvancado
            if (perfilAvancado_1.PerfilAvancado.isPerfilAvancado(perfil) && apelido === perfil.apelido && senha === perfil.senha) {
                console.log("\n\u001B[32m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551     \uD83C\uDF89 Login de Perfil Avan\u00E7ado           \u2551\n\u2551        Bem-vindo, Administrador!         \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
                this._perfilAtual = perfil;
                this._isLoggedIn = true;
                return;
            }
            console.clear();
            console.log("\n      \u001B[34m\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n      \u2502 \uD83D\uDD10 Op\u00E7\u00F5es de Acesso                     \u2502\n      \u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524\n      \u2502 \u001B[33m1\u001B[34m - \u001B[32mLogin                               \u001B[34m\u2502\n      \u2502 \u001B[33m2\u001B[34m - \u001B[32mCriar Nova Conta                    \u001B[34m\u2502\n      \u2502 \u001B[33m3\u001B[34m - \u001B[33mRecuperar Senha                     \u001B[34m\u2502\n      \u2502 \u001B[33m4\u001B[34m - \u001B[35mLogin de Perfil Avan\u00E7ado            \u001B[34m\u2502\n      \u2502 \u001B[33m0\u001B[34m - \u001B[31mSair                                \u001B[34m\u2502\n      \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\u001B[0m");
            console.log("\n\u001B[31m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551   \u26A0\uFE0F Acesso negado. Perfil n\u00E3o autorizado \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
        }
    };
    App.prototype.criarNovoPerfilAvancado = function () {
        try {
            if (perfilAvancado_1.PerfilAvancado.isPerfilAvancado(this._perfilAtual)) {
                console.log("\n\x1b[34m📝 Criar Novo Perfil Avançado \x1b[0m");
                var apelido = (0, auxFunctions_1.getData)("👤 Escolha um nome de usuário: ");
                var email = (0, auxFunctions_1.getData)("📧 Digite seu email: ");
                var senha = (0, auxFunctions_1.getData)("🔐 Escolha uma senha: ");
                var novoPerfilAvancado = perfilAvancado_1.PerfilAvancado.criarNovoPerfilAvancado(apelido, email, senha);
                this._redeSocial.adicionarPerfil(novoPerfilAvancado);
                (0, auxFunctions_1.salvarDadosPerfis)(this._redeSocial.listarPerfis());
                console.log("\n\u001B[32m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551     \uD83C\uDF89 Perfil Avan\u00E7ado criado com sucesso! \u2551\n\u2551     Bem-vindo, ".concat(apelido, "!               \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m"));
            }
            else {
                console.log("\n\u001B[31m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                                                               \u2551\n\u2551   \u26A0\uFE0F Apenas perfis avan\u00E7ados podem criar outros perfis avan\u00E7ados.            \u2551\n\u2551                                                                               \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
            }
            this.delay(3000);
        }
        catch (error) {
            console.log("\n\u001B[31m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551   \u274C Erro ao criar perfil avan\u00E7ado: ".concat(error.message, " \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m"));
        }
        this.delay(3000);
    };
    App.prototype.criarPerfilComum = function () {
        try {
            if (perfilAvancado_1.PerfilAvancado.isPerfilAvancado(this._perfilAtual)) {
                console.log("\n\x1b[34m📝 Criar Novo Perfil Comum \x1b[0m");
                var apelido = (0, auxFunctions_1.getData)("👤 Escolha um nome de usuário: ");
                var email = (0, auxFunctions_1.getData)("📧 Digite seu email: ");
                var senha = (0, auxFunctions_1.getData)("🔐 Escolha uma senha: ");
                var novoPerfilComum = new perfil_1.Perfil((0, ulid_1.ulid)(), apelido, email, "default.png", // Foto padrão
                senha, true, [], [], []);
                this._redeSocial.adicionarPerfil(novoPerfilComum);
                (0, auxFunctions_1.salvarDadosPerfis)(this._redeSocial.listarPerfis());
                console.log("\n\u001B[32m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551     \uD83C\uDF89 Perfil Comum criado com sucesso!  \u2551\n\u2551     Bem-vindo, ".concat(apelido, "!               \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m"));
            }
            else {
                console.log("\n\u001B[31m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551   \u26A0\uFE0F Apenas perfis avan\u00E7ados podem criar perfis comuns. \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
                this.delay(3000);
            }
        }
        catch (error) {
            console.log("\n\u001B[31m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551   \u274C Erro ao criar perfil comum: ".concat(error.message, " \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m"));
        }
    };
    App.prototype.criarLinha = function (caractere, comprimento) {
        if (caractere === void 0) { caractere = "-"; }
        if (comprimento === void 0) { comprimento = 40; }
        return caractere.repeat(comprimento);
    };
    App.prototype.centralizarTexto = function (texto, largura) {
        if (largura === void 0) { largura = 40; }
        var espacosEsquerda = Math.floor((largura - texto.length) / 2);
        var espacosDireita = largura - texto.length - espacosEsquerda;
        return " ".repeat(espacosEsquerda) + texto + " ".repeat(espacosDireita);
    };
    App.prototype.exibirTitulo = function (titulo) {
        console.log("\n" + this.criarLinha("="));
        console.log("\n" + this.criarLinha("="));
        console.log(this.centralizarTexto(titulo.toUpperCase()));
        console.log(this.criarLinha("=") + "\n");
        console.log(this.criarLinha("=") + "\n");
    };
    App.prototype.menuPrincipal = function () {
        var _a;
        console.clear();
        var opcao = "";
        var appOn = true;
        do {
            this.exibirTitulo("Bem-vindo, ".concat((_a = this._perfilAtual) === null || _a === void 0 ? void 0 : _a.apelido));
            console.log("\n\u001B[36m\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n\u2502 \uD83C\uDFE0 Menu Principal                       \u2502\n\u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524\n\u2502 \u001B[33m1\u001B[36m - \u001B[34mConfigurar Perfil                   \u001B[36m\u2502\n\u2502 \u001B[33m2\u001B[36m - \u001B[34mPublica\u00E7\u00F5es                         \u001B[36m\u2502\n\u2502 \u001B[33m3\u001B[36m - \u001B[34mIntera\u00E7\u00F5es Sociais                  \u001B[36m\u2502\n\u2502 \u001B[33m4\u001B[36m - \u001B[35mGerenciar Perfis                    \u001B[36m\u2502\n\u2502 \u001B[33m0\u001B[36m - \u001B[31m\u21AA Deslogar                          \u001B[36m\u2502\n\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\u001B[0m");
            opcao = (0, auxFunctions_1.getData)("\n➤ Escolha uma opção: ");
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
                    if (perfilAvancado_1.PerfilAvancado.isPerfilAvancado(this._perfilAtual)) {
                        this.menuGerenciarPerfis();
                    }
                    else {
                        console.clear();
                        console.log("\n              \u001B[31m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n              \u2551                                                                         \u2551\n              \u2551   \u26A0\uFE0F  Apenas perfis avan\u00E7ados podem acessar o gerenciamento de perfis.   \u2551\n              \u2551                                                                         \u2551\n              \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
                        this.delay(3000);
                    }
                    break;
                case "0":
                    console.log("\n\u001B[32m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551     \uD83D\uDC4B Deslogado com sucesso!           \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
                    this._perfilAtual = null;
                    this._isLoggedIn = false;
                    appOn = false;
                    break;
                default:
                    (0, auxFunctions_1.print)("\x1b[33m⚠ Opção inválida! Tente novamente. ⚠\x1b[0m");
                    break;
            }
        } while (appOn);
        // Volta para a tela de opções de acesso
        this.start();
    };
    App.prototype.menuPerfil = function () {
        var opcao = "";
        do {
            (0, auxFunctions_1.clear)();
            this.exibirTitulo("Configurações do Perfil");
            console.log("\n\u001B[36m\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n\u2502 \uD83D\uDC64 Op\u00E7\u00F5es de Perfil             \u2502\n\u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524\n\u2502 \u001B[33m1\u001B[36m - \u001B[34mVisualizar Perfil        \u001B[36m\u2502\n\u2502 \u001B[33m2\u001B[36m - \u001B[34mAlterar Perfil           \u001B[36m\u2502\n\u2502 \u001B[33m3\u001B[36m - \u001B[31mDeletar Perfil           \u001B[36m\u2502\n\u2502 \u001B[33m0\u001B[36m - \u001B[32mVoltar                   \u001B[36m\u2502\n\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\u001B[0m");
            opcao = (0, auxFunctions_1.getData)("\n➤ Escolha uma opção: ");
            switch (opcao) {
                case "1":
                    this.acessarPerfil();
                    break;
                case "2":
                    this.menuAlterarPerfil();
                    break;
                case "3":
                    if (validations.validationTrocarSenha(this._perfilAtual.senha)) {
                        (0, auxFunctions_1.print)("\x1b[31m🗑 Deletando perfil... 🗑\x1b[0m");
                        this._redeSocial.desativarPerfil(this._perfilAtual.apelido);
                        this._perfilAtual = null;
                        this._isLoggedIn = false;
                        (0, auxFunctions_1.salvarDadosPerfis)(this._redeSocial.listarPerfis());
                        (0, auxFunctions_1.print)("\x1b[31m✘ Perfil Deletado! ✘\x1b[0m");
                        this.start();
                    }
                    return;
                case "0":
                    (0, auxFunctions_1.print)("\x1b[32m↩ Voltando ao Menu Principal... ↩\x1b[0m");
                    break;
                default:
                    (0, auxFunctions_1.print)("\x1b[33m⚠ Opção inválida! Tente novamente. ⚠\x1b[0m");
                    break;
            }
        } while (opcao !== "0");
    };
    App.prototype.menuPublicacoes = function () {
        var opcao = "";
        do {
            (0, auxFunctions_1.clear)();
            this.exibirTitulo("Gerenciamento de Publicações");
            console.log("\n\n\u001B[36m\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n\u2502 \uD83D\uDCDD Publica\u00E7\u00F5es                          \u2502\n\u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524\n\u2502 \u001B[33m1\u001B[36m - \u001B[34m\u2795 Criar Publica\u00E7\u00E3o                 \u001B[36m\u2502\n\u2502 \u001B[33m2\u001B[36m - \u001B[34m\u2795 Criar Publica\u00E7\u00E3o Avan\u00E7ada        \u001B[36m\u2502\n\u2502 \u001B[33m3\u001B[36m - \u001B[34m\uD83D\uDCCB Listar Minhas Publica\u00E7\u00F5es        \u001B[36m\u2502\n\u2502 \u001B[33m4\u001B[36m - \u001B[34m\u270F\uFE0F  Editar Publica\u00E7\u00E3o                \u001B[36m\u2502\n\u2502 \u001B[33m5\u001B[36m - \u001B[31m\uD83D\uDDD1 Excluir Publica\u00E7\u00E3o                \u001B[36m\u2502\n\u2502 \u001B[33m6\u001B[36m - \u001B[34m\uD83D\uDC40 Ver Todas Publica\u00E7\u00F5es            \u001B[36m\u2502\n\u2502 \u001B[33m7\u001B[36m - \u001B[34m\uD83D\uDC65 Interagir com Publica\u00E7\u00E3o         \u001B[36m\u2502\n\u2502 \u001B[33m0\u001B[36m - \u001B[32m\u21A9 Voltar                            \u001B[36m\u2502\n\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\u001B[0m");
            opcao = (0, auxFunctions_1.getData)("\n➤ Escolha uma opção: ");
            switch (opcao) {
                case "1":
                    this.criarPublicacao();
                    break;
                case "2":
                    this.fazerPublicacaoAvancada();
                    this.delay(3000);
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
                    (0, auxFunctions_1.print)("\x1b[32m↩ Voltando ao Menu Principal... ↩\x1b[0m");
                    break;
                default:
                    (0, auxFunctions_1.print)("\x1b[33m⚠ Opção inválida! Tente novamente. ⚠\x1b[0m");
                    break;
            }
        } while (opcao !== "0");
        console.clear();
    };
    App.prototype.criarPublicacao = function () {
        var novaPublicacao = this._redeSocial.criarPublicacao(this._perfilAtual.apelido);
        if (novaPublicacao) {
            console.log("\n\u001B[32m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551     \uD83C\uDF89 Publica\u00E7\u00E3o criada com sucesso!   \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
        }
        else {
            console.log("\n\u001B[31m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551     \u274C Erro ao criar publica\u00E7\u00E3o         \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
        }
        (0, auxFunctions_1.getData)("\nPressione Enter para continuar...");
    };
    App.prototype.listarMinhasPublicacoes = function () {
        var publicacoes = this._redeSocial.listarPublicacoes(this._perfilAtual.apelido);
        if (publicacoes.length === 0) {
            console.log("\n\u001B[33m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551     \uD83D\uDCED Voc\u00EA ainda n\u00E3o tem publica\u00E7\u00F5es     \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
        }
        else {
            console.log("\n🗒️  Minhas Publicações:");
            publicacoes.forEach(function (pub, index) {
                console.log("\n\u001B[34m".concat(index + 1, ". \uD83D\uDCDD ").concat(pub.conteudo, "\n   \uD83D\uDCC5 ").concat(pub.dataHora.toLocaleString(), "\n            \u001B[0m"));
            });
        }
        (0, auxFunctions_1.getData)("\nPressione Enter para continuar...");
    };
    App.prototype.editarPublicacao = function () {
        var publicacoes = this._redeSocial.listarPublicacoes(this._perfilAtual.apelido);
        if (publicacoes.length === 0) {
            console.log("\n\u001B[33m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551     \uD83D\uDCED Voc\u00EA n\u00E3o tem publica\u00E7\u00F5es para      \u2551\n\u2551           editar                         \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
            (0, auxFunctions_1.getData)("\nPressione Enter para continuar...");
            return;
        }
        console.log("\n🗒️  Escolha a publicação para editar:");
        publicacoes.forEach(function (pub, index) {
            console.log("\u001B[34m".concat(index + 1, ". ").concat(pub.conteudo, "\u001B[0m"));
        });
        var escolha = (0, auxFunctions_1.getNumber)("\n➤ Digite o número da publicação: ") - 1;
        if (escolha < 0 || escolha >= publicacoes.length) {
            (0, auxFunctions_1.print)("\x1b[31m⚠️ Publicação inválida! ⚠️\x1b[0m");
            return;
        }
        var publicacaoSelecionada = publicacoes[escolha];
        var novoConteudo = (0, auxFunctions_1.getData)("\x1b[34m✏️  Digite o novo conteúdo: \x1b[0m");
        var sucesso = this._redeSocial.editarPublicacao(this._perfilAtual.apelido, publicacaoSelecionada.id, novoConteudo);
        if (sucesso) {
            console.log("\n\u001B[32m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551     \uD83C\uDF89 Publica\u00E7\u00E3o editada com sucesso!  \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
        }
        else {
            console.log("\n\u001B[31m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551     \u274C Erro ao editar publica\u00E7\u00E3o        \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
        }
        (0, auxFunctions_1.getData)("\nPressione Enter para continuar...");
    };
    App.prototype.excluirPublicacao = function () {
        var publicacoes = this._redeSocial.listarPublicacoes(this._perfilAtual.apelido);
        if (publicacoes.length === 0) {
            console.log("\n\u001B[33m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551     \uD83D\uDCED Voc\u00EA n\u00E3o tem publica\u00E7\u00F5es para      \u2551\n\u2551           excluir                        \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
            (0, auxFunctions_1.getData)("\nPressione Enter para continuar...");
            return;
        }
        console.log("\n🗒️  Escolha a publicação para excluir:");
        publicacoes.forEach(function (pub, index) {
            console.log("\u001B[34m".concat(index + 1, ". ").concat(pub.conteudo, "\u001B[0m"));
        });
        var escolha = (0, auxFunctions_1.getNumber)("\n➤ Digite o número da publicação: ") - 1;
        if (escolha < 0 || escolha >= publicacoes.length) {
            (0, auxFunctions_1.print)("\x1b[31m⚠️ Publicação inválida! ⚠️\x1b[0m");
            return;
        }
        var publicacaoSelecionada = publicacoes[escolha];
        var confirmacao = (0, auxFunctions_1.getData)("\x1b[31m❗ Tem certeza que deseja excluir esta publicação? (s/n): \x1b[0m");
        if (confirmacao.toLowerCase() === "s") {
            var sucesso = this._redeSocial.deletarPublicacao(this._perfilAtual.apelido, publicacaoSelecionada.id);
            if (sucesso) {
                console.log("\n\u001B[32m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551     \uD83D\uDDD1 Publica\u00E7\u00E3o exclu\u00EDda com sucesso!   \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
            }
            else {
                console.log("\n\u001B[31m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551     \u274C Erro ao excluir publica\u00E7\u00E3o       \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
            }
        }
        else {
            (0, auxFunctions_1.print)("\x1b[32m↩ Operação cancelada. ↩\x1b[0m");
        }
        (0, auxFunctions_1.getData)("\nPressione Enter para continuar...");
    };
    App.prototype.verTodasPublicacoes = function () {
        var _this = this;
        var publicacoes = this._redeSocial.listarTodasPublicacoes();
        if (publicacoes.length === 0) {
            console.log("\n\u001B[33m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551     \uD83D\uDCED N\u00E3o existem publica\u00E7\u00F5es           \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
        }
        else {
            console.log('\n🗒️  Todas as Publicações:');
            publicacoes.forEach(function (pub, index) {
                var _a;
                console.log("\n\u001B[34m".concat(index + 1, ". \uD83D\uDCDD ").concat(pub.conteudo, "\n   \uD83D\uDCC5 ").concat(pub.dataHora.toLocaleString(), "\n   \uD83D\uDC64 Autor: ").concat(((_a = _this._redeSocial.buscarPerfilPorID(pub.perfilAssociado)) === null || _a === void 0 ? void 0 : _a.apelido) || 'Desconhecido', "\n      \u001B[0m"));
                // Se for uma PublicacaoAvancada, mostrar interações
                if (pub instanceof publicacaoAvancada_1.PublicacaoAvancada || publicacaoAvancada_1.PublicacaoAvancada.isPublicacaoAvancada(pub)) {
                    var publicacaoAvancada = pub instanceof publicacaoAvancada_1.PublicacaoAvancada
                        ? pub
                        : Object.assign(new publicacaoAvancada_1.PublicacaoAvancada(pub.id, pub.conteudo, pub.dataHora, pub.perfilAssociado), pub);
                    var interacoes = publicacaoAvancada.listarInteracoesDetalhadas();
                    var contagemInteracoes = publicacaoAvancada.contarInteracoesPorTipo();
                    console.log('\n   📊 Resumo de Interações:');
                    console.log("   \uD83D\uDC4D Curtir: ".concat(contagemInteracoes[tipoInteracao_1.TipoInteracao.Curtir]));
                    console.log("   \uD83D\uDC4E N\u00E3o Curtir: ".concat(contagemInteracoes[tipoInteracao_1.TipoInteracao.NaoCurtir]));
                    console.log("   \uD83D\uDE02 Riso: ".concat(contagemInteracoes[tipoInteracao_1.TipoInteracao.Riso]));
                    console.log("   \uD83D\uDE2E Surpresa: ".concat(contagemInteracoes[tipoInteracao_1.TipoInteracao.Surpresa]));
                }
            });
        }
        (0, auxFunctions_1.getData)("\nPressione Enter para continuar...");
    };
    App.prototype.menuSolicitacoes = function () {
        var opcao = "";
        do {
            (0, auxFunctions_1.clear)();
            this.exibirTitulo("Gerenciamento de Solicitações");
            console.log("\n\u001B[36m\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n\u2502 \uD83D\uDC65 Solicita\u00E7\u00F5es de Amizade               \u2502\n\u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524\n\u2502 \u001B[33m1\u001B[36m - \u001B[34m\uD83D\uDC40 Visualizar Solicita\u00E7\u00F5es           \u001B[36m\u2502\n\u2502 \u001B[33m2\u001B[36m - \u001B[32m\u2705 Aceitar Solicita\u00E7\u00E3o              \u001B[36m\u2502\n\u2502 \u001B[33m3\u001B[36m - \u001B[31m\u274C Recusar Solicita\u00E7\u00E3o              \u001B[36m\u2502\n\u2502 \u001B[33m4\u001B[36m - \u001B[34m\u2795 Enviar Solicita\u00E7\u00E3o               \u001B[36m\u2502\n\u2502 \u001B[33m0\u001B[36m - \u001B[32m\u21A9 Voltar                            \u001B[36m\u2502\n\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\u001B[0m");
            opcao = (0, auxFunctions_1.getData)("\n➤ Escolha uma opção: ");
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
                    (0, auxFunctions_1.print)("\x1b[32m↩ Voltando ao Menu Principal... ↩\x1b[0m");
                    break;
                default:
                    (0, auxFunctions_1.print)("\x1b[33m⚠ Opção inválida! Tente novamente. ⚠\x1b[0m");
                    break;
            }
            (0, auxFunctions_1.salvarDadosPerfis)(this._redeSocial.listarPerfis());
        } while (opcao !== "0");
    };
    App.prototype.visualizarSolicitacoes = function () {
        var solicitacoes = this._redeSocial.listarSolicitacoes(this._perfilAtual.apelido);
        if (solicitacoes.length === 0) {
            console.log("\n\u001B[33m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551     \uD83D\uDCED Voc\u00EA n\u00E3o tem solicita\u00E7\u00F5es           \u2551\n\u2551         de amizade                       \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
        }
        else {
            console.log("\n👥 Solicitações de Amizade:");
            solicitacoes.forEach(function (solicitacao, index) {
                console.log("\u001B[34m".concat(index + 1, ". \uD83D\uDC64 ").concat(solicitacao, "\u001B[0m"));
            });
        }
        (0, auxFunctions_1.getData)("\nPressione Enter para continuar...");
    };
    App.prototype.aceitarSolicitacao = function () {
        var _a;
        var solicitacoes = (_a = this._perfilAtual) === null || _a === void 0 ? void 0 : _a.solicitacoesAmizade;
        if (solicitacoes) {
            if (solicitacoes.length === 0) {
                console.log("\n\u001B[33m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551     \uD83D\uDCED Voc\u00EA n\u00E3o tem solicita\u00E7\u00F5es        \u2551\n\u2551         de amizade                       \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
            }
            else {
                solicitacoes.forEach(function (perfil, index) {
                    console.log("Id: ".concat(index + 1, " - Usu\u00E1rio: ").concat(perfil));
                });
                var index = (0, auxFunctions_1.getNumber)("\nDigite o ID do usuário que deseja aceitar a solicitação de amizada: ");
                var apelidoPerfil = solicitacoes[index - 1];
                this._redeSocial.processarSolicitacao(this._perfilAtual.apelido, apelidoPerfil, true);
            }
        }
    };
    App.prototype.recusarSolicitacao = function () {
        var _a;
        var solicitacoes = (_a = this._perfilAtual) === null || _a === void 0 ? void 0 : _a.solicitacoesAmizade;
        if (solicitacoes) {
            if (solicitacoes.length === 0) {
                console.log("\n\u001B[33m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551     \uD83D\uDCED Voc\u00EA n\u00E3o tem solicita\u00E7\u00F5es        \u2551\n\u2551         de amizade                       \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
            }
            else {
                solicitacoes.forEach(function (perfil, index) {
                    console.log("Id: ".concat(index + 1, " - Usu\u00E1rio: ").concat(perfil));
                });
                var index = (0, auxFunctions_1.getNumber)("\nDigite o ID do usuário que deseja aceitar a solicitação de amizada: ");
                var apelidoPerfil = solicitacoes[index - 1];
                this._redeSocial.processarSolicitacao(this._perfilAtual.apelido, apelidoPerfil, false);
            }
        }
    };
    App.prototype.enviarSolicitacao = function () {
        var _this = this;
        try {
            var usuariosAtuais = this._redeSocial.listarPerfis();
            usuariosAtuais.forEach(function (perfil, index) {
                var _a, _b;
                if (perfil["_apelido"] !== ((_a = _this._perfilAtual) === null || _a === void 0 ? void 0 : _a.apelido)) {
                    var isAmigo = (_b = _this._perfilAtual) === null || _b === void 0 ? void 0 : _b.amigos.includes(perfil["_apelido"]);
                    console.log("Id: ".concat(index + 1, " - Usu\u00E1rio: ").concat(perfil["_apelido"]).concat(isAmigo ? " (amigos)" : ""));
                }
            });
            var index = (0, auxFunctions_1.getNumber)("\nDigite o ID do usuário que deseja adicionar como amigo: ");
            // const idPerfil = usuariosAtuais[index - 1]["_id"];
            var apelidoPerfil = usuariosAtuais[index - 1]["_apelido"];
            this._redeSocial.enviarSolicitacao(this._perfilAtual.apelido, apelidoPerfil);
        }
        catch (error) {
            console.log("\n\u001B[31m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551     \u274C Erro ao enviar solicita\u00E7\u00E3o        \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
        }
        (0, auxFunctions_1.getData)("\nPressione Enter para continuar...");
    };
    App.prototype.acessarPerfil = function () {
        if (this._perfilAtual) {
            (0, auxFunctions_1.print)(this._perfilAtual.toString());
        }
    };
    App.prototype.menuAlterarPerfil = function () {
        var opcao = "";
        do {
            (0, auxFunctions_1.clear)();
            this.exibirTitulo("Alterar Perfil");
            console.log("\n\u001B[36m\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n\u2502 \uD83D\uDEE0\uFE0F  Configura\u00E7\u00F5es de Perfil              \u2502\n\u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524\n\u2502 \u001B[33m1\u001B[36m - \u001B[34m\uD83D\uDC64 Alterar Apelido                  \u001B[36m\u2502\n\u2502 \u001B[33m2\u001B[36m - \u001B[34m\uD83D\uDCE7 Alterar Email                    \u001B[36m\u2502\n\u2502 \u001B[33m3\u001B[36m - \u001B[34m\uD83D\uDDBC\uFE0F  Alterar Foto                     \u001B[36m\u2502\n\u2502 \u001B[33m4\u001B[36m - \u001B[34m\uD83D\uDD10 Alterar Senha                    \u001B[36m\u2502\n\u2502 \u001B[33m5\u001B[36m - \u001B[31m\u274C Desativar Conta                  \u001B[36m\u2502\n\u2502 \u001B[33m0\u001B[36m - \u001B[32m\u21A9 Voltar                            \u001B[36m\u2502\n\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\u001B[0m");
            opcao = (0, auxFunctions_1.getData)("\n➤ Escolha uma opção: ");
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
                    (0, auxFunctions_1.print)("\x1b[32m↩ Voltando ao Menu Principal... ↩\x1b[0m");
                    break;
                default:
                    (0, auxFunctions_1.print)("\x1b[33m⚠ Opção inválida! Tente novamente. ⚠\x1b[0m");
                    break;
            }
        } while (opcao !== "0");
        console.clear();
    };
    // Métodos auxiliares para cada alteração
    App.prototype.alterarApelido = function () {
        var novoApelido = (0, auxFunctions_1.getData)("\x1b[34m👤 Insira o novo apelido: \x1b[0m");
        try {
            if (validations.validationTrocarApelido(novoApelido)) {
                this._perfilAtual.apelido = novoApelido;
                (0, auxFunctions_1.salvarDadosPerfis)(this._redeSocial.listarPerfis());
                console.log("\n\u001B[32m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551     \uD83C\uDF89 Apelido alterado com sucesso!    \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
            }
        }
        catch (error) {
            console.log("\u001B[31m\u26A0\uFE0F ".concat(error.message, "\u001B[0m"));
        }
        (0, auxFunctions_1.getData)("\nPressione Enter para continuar...");
    };
    App.prototype.alterarEmail = function () {
        var novoEmail = (0, auxFunctions_1.getData)("\x1b[34m📧 Insira o novo email: \x1b[0m");
        try {
            if (validations.validationEmail(novoEmail)) {
                this._perfilAtual.email = novoEmail;
                (0, auxFunctions_1.salvarDadosPerfis)(this._redeSocial.listarPerfis());
                console.log("\n\u001B[32m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551     \uD83C\uDF89 Email alterado com sucesso!      \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
            }
        }
        catch (error) {
            console.log("\u001B[31m\u26A0\uFE0F ".concat(error.message, "\u001B[0m"));
        }
        (0, auxFunctions_1.getData)("\nPressione Enter para continuar...");
    };
    App.prototype.alterarFoto = function () {
        console.log("\n🖼️  Escolha sua nova foto de perfil:");
        var novaFoto = (0, auxFunctions_1.choosePhoto)();
        this._perfilAtual.foto = novaFoto;
        (0, auxFunctions_1.salvarDadosPerfis)(this._redeSocial.listarPerfis());
        console.log("\n\u001B[32m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551     \uD83C\uDF89 Foto de perfil atualizada!       \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
        (0, auxFunctions_1.getData)("\nPressione Enter para continuar...");
    };
    App.prototype.alterarSenha = function () {
        if (validations.validationTrocarSenha(this._perfilAtual.senha)) {
            var novaSenha = (0, auxFunctions_1.getData)("\x1b[34m🔐 Insira a nova senha: \x1b[0m");
            this._perfilAtual.senha = novaSenha;
            (0, auxFunctions_1.salvarDadosPerfis)(this._redeSocial.listarPerfis());
            console.log("\n\u001B[32m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551     \uD83C\uDF89 Senha alterada com sucesso!      \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
        }
        (0, auxFunctions_1.getData)("\nPressione Enter para continuar...");
    };
    App.prototype.desativarConta = function () {
        var confirmacao = (0, auxFunctions_1.getData)("\x1b[31m❗ Tem certeza que deseja desativar sua conta? (s/n): \x1b[0m");
        if (confirmacao.toLowerCase() === "s") {
            this._redeSocial.desativarPerfil(this._perfilAtual.apelido);
            this._perfilAtual = null;
            this._isLoggedIn = false;
            (0, auxFunctions_1.salvarDadosPerfis)(this._redeSocial.listarPerfis());
            console.log("\n\u001B[31m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551     \u274C Conta desativada com sucesso!    \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
            this.start();
        }
        else {
            (0, auxFunctions_1.print)("\x1b[32m↩ Operação cancelada. ↩\x1b[0m");
        }
    };
    App.prototype.menuInteracoesSociais = function () {
        var opcao = "";
        do {
            (0, auxFunctions_1.clear)();
            this.exibirTitulo("Interações Sociais");
            console.log("\n\n\u001B[36m\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n\u2502 \uD83D\uDC65 Intera\u00E7\u00F5es Sociais                   \u2502\n\u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524\n\u2502 \u001B[33m1\u001B[36m - \u001B[34m\uD83D\uDC40 Visualizar Lista de Amigos       \u001B[36m\u2502\n\u2502 \u001B[33m2\u001B[36m - \u001B[31m\uD83D\uDDD1 Remover Amigo                     \u001B[36m\u2502\n\u2502 \u001B[33m3\u001B[36m - \u001B[34m\uD83D\uDC65 Solicita\u00E7\u00F5es de Amizade          \u001B[36m\u2502\n\u2502 \u001B[33m0\u001B[36m - \u001B[32m\u21A9 Voltar                            \u001B[36m\u2502\n\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\u001B[0m");
            opcao = (0, auxFunctions_1.getData)("\n➤ Escolha uma opção: ");
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
                    (0, auxFunctions_1.print)("\x1b[32m↩ Voltando ao Menu Principal... ↩\x1b[0m");
                    break;
                default:
                    (0, auxFunctions_1.print)("\x1b[33m⚠ Opção inválida! Tente novamente. ⚠\x1b[0m");
                    break;
            }
        } while (opcao !== "0");
        console.clear();
    };
    App.prototype.visualizarListaAmigos = function () {
        var _this = this;
        var amigos = this._perfilAtual.amigos;
        if (amigos.length === 0) {
            console.log("\n\u001B[33m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551     \uD83D\uDCED Voc\u00EA n\u00E3o tem amigos ainda        \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
        }
        else {
            console.log("\n👥 Seus Amigos:");
            amigos.forEach(function (amigo, index) {
                var perfilAmigo = _this._redeSocial.buscarPerfil(amigo);
                console.log("\n\u001B[34m".concat(index + 1, ". \uD83D\uDC64 ").concat(amigo, "\n   \uD83D\uDCE7 ").concat((perfilAmigo === null || perfilAmigo === void 0 ? void 0 : perfilAmigo.email) || "Email não disponível", "\n   \uD83D\uDDBC\uFE0F  ").concat((perfilAmigo === null || perfilAmigo === void 0 ? void 0 : perfilAmigo.foto) || "Sem foto", "\n            \u001B[0m"));
            });
        }
        (0, auxFunctions_1.getData)("\nPressione Enter para continuar...");
    };
    App.prototype.removerAmigo = function () {
        var amigos = this._perfilAtual.amigos;
        if (amigos.length === 0) {
            console.log("\n\u001B[33m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551     \uD83D\uDCED Voc\u00EA n\u00E3o tem amigos para remover  \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
            (0, auxFunctions_1.getData)("\nPressione Enter para continuar...");
            return;
        }
        console.log("\n👥 Escolha um amigo para remover:");
        amigos.forEach(function (amigo, index) {
            console.log("\u001B[34m".concat(index + 1, ". \uD83D\uDC64 ").concat(amigo, "\u001B[0m"));
        });
        var escolha = (0, auxFunctions_1.getNumber)("\n➤ Digite o número do amigo: ") - 1;
        if (escolha < 0 || escolha >= amigos.length) {
            (0, auxFunctions_1.print)("\x1b[31m⚠️ Amigo inválido! ⚠️\x1b[0m");
            return;
        }
        var amigoParaRemover = amigos[escolha];
        var confirmacao = (0, auxFunctions_1.getData)("\u001B[31m\u2757 Tem certeza que deseja remover ".concat(amigoParaRemover, "? (s/n): \u001B[0m"));
        if (confirmacao.toLowerCase() === "s") {
            // Remove o amigo do perfil atual
            this._perfilAtual.removerAmigo(amigoParaRemover);
            // Remove o perfil atual da lista de amigos do outro usuário
            var perfilAmigo = this._redeSocial.buscarPerfil(amigoParaRemover);
            if (perfilAmigo) {
                perfilAmigo.removerAmigo(this._perfilAtual.apelido);
            }
            (0, auxFunctions_1.salvarDadosPerfis)(this._redeSocial.listarPerfis());
            console.log("\n\u001B[32m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551     \uD83D\uDDD1 Amigo removido com sucesso!      \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
        }
        else {
            (0, auxFunctions_1.print)("\x1b[32m↩ Operação cancelada. ↩\x1b[0m");
        }
        (0, auxFunctions_1.getData)("\nPressione Enter para continuar...");
    };
    App.prototype.editarPerfilComum = function () {
        if (perfilAvancado_1.PerfilAvancado.isPerfilAvancado(this._perfilAtual)) {
            var apelido = (0, auxFunctions_1.getData)("👤 Apelido do perfil a ser editado: ");
            var perfil = this._redeSocial.buscarPerfil(apelido);
            if (perfil) {
                var novoApelido = (0, auxFunctions_1.getData)("👤 Novo apelido: ");
                var novoEmail = (0, auxFunctions_1.getData)("📧 Novo email: ");
                this._perfilAtual.editarPerfilComum(perfil, novoApelido, novoEmail);
                (0, auxFunctions_1.salvarDadosPerfis)(this._redeSocial.listarPerfis());
                console.log("\n\u001B[32m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551     \uD83C\uDF89 Perfil Comum editado com sucesso! \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
            }
            else {
                console.log("\n\u001B[31m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551   \u26A0\uFE0F Perfil n\u00E3o encontrado.               \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
            }
        }
        else {
            console.log("\n\u001B[31m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551   \u26A0\uFE0F Apenas perfis avan\u00E7ados podem editar perfis comuns. \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
            this.delay(3000);
        }
    };
    App.prototype.excluirPerfilComum = function () {
        if (perfilAvancado_1.PerfilAvancado.isPerfilAvancado(this._perfilAtual)) {
            var apelido = (0, auxFunctions_1.getData)("👤 Apelido do perfil a ser excluído: ");
            var perfil = this._redeSocial.buscarPerfil(apelido);
            if (perfil) {
                this._redeSocial.removerPerfil(apelido);
                (0, auxFunctions_1.salvarDadosPerfis)(this._redeSocial.listarPerfis());
                console.log("\n\u001B[32m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551     \uD83D\uDDD1 Perfil Comum exclu\u00EDdo com sucesso! \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
            }
            else {
                console.log("\n\u001B[31m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551   \u26A0\uFE0F Perfil n\u00E3o encontrado.               \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
            }
            this.delay(3000);
        }
        else {
            console.log("\n\u001B[31m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551   \u26A0\uFE0F Apenas perfis avan\u00E7ados podem excluir perfis comuns. \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
            this.delay(3000);
        }
    };
    App.prototype.menuGerenciarPerfis = function () {
        var opcao = "";
        var gerenciarOn = true;
        do {
            (0, auxFunctions_1.clear)();
            this.exibirTitulo("Gerenciar Perfis");
            console.log("\n\u001B[36m\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n\u2502 \uD83D\uDD27 Gerenciar Perfis                     \u2502\n\u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524\n\u2502 \u001B[33m1\u001B[36m - \u001B[34mCriar Perfil Avan\u00E7ado               \u001B[36m\u2502\n\u2502 \u001B[33m2\u001B[36m - \u001B[34mCriar Perfil Comum                  \u001B[36m\u2502\n\u2502 \u001B[33m3\u001B[36m - \u001B[34mEditar Perfil Comum                 \u001B[36m\u2502\n\u2502 \u001B[33m4\u001B[36m - \u001B[34mExcluir Perfil Comum                \u001B[36m\u2502\n\u2502 \u001B[33m5\u001B[36m - \u001B[34mFazer Publica\u00E7\u00E3o Avan\u00E7ada           \u001B[36m\u2502\n\u2502 \u001B[33m0\u001B[36m - \u001B[31m\u21AA Voltar                            \u001B[36m\u2502\n\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\u001B[0m");
            opcao = (0, auxFunctions_1.getData)("\n➤ Escolha uma opção: ");
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
                    (0, auxFunctions_1.print)("\x1b[33m⚠ Opção inválida! Tente novamente. ⚠\x1b[0m");
                    break;
            }
        } while (gerenciarOn);
    };
    App.prototype.fazerPublicacaoAvancada = function () {
        try {
            if (perfilAvancado_1.PerfilAvancado.isPerfilAvancado(this._perfilAtual)) {
                console.log("\n\x1b[34m📝 Fazer Publicação Avançada \x1b[0m");
                var conteudo = (0, auxFunctions_1.getData)("✍️ Digite o conteúdo da publicação: ");
                var novaPublicacao = new publicacaoAvancada_1.PublicacaoAvancada("SUPER" + (0, ulid_1.ulid)(), conteudo, new Date(), this._perfilAtual.id);
                this._redeSocial.adicionarPublicacao(novaPublicacao);
                (0, auxFunctions_1.salvarDadosPublicacoes)(this._redeSocial.listarTodasPublicacoes());
                console.log("\n\u001B[32m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551     \uD83C\uDF89 Publica\u00E7\u00E3o Avan\u00E7ada criada com sucesso! \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
            }
            else {
                console.log("\n\u001B[31m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                                                  \u2551\n\u2551   \u26A0\uFE0F Apenas perfis avan\u00E7ados podem fazer publica\u00E7\u00F5es avan\u00E7adas.   \u2551\n\u2551                                                                  \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
                this.delay(3000);
            }
        }
        catch (error) {
            console.log("\n\u001B[31m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551   \u274C Erro ao criar publica\u00E7\u00E3o avan\u00E7ada: ".concat(error.message, " \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m"));
            this.delay(3000);
        }
    };
    App.prototype.interagirPublicacaoAvancada = function () {
        try {
            if (perfilAvancado_1.PerfilAvancado.isPerfilAvancado(this._perfilAtual)) {
                console.log("\n\x1b[34m👥 Interagir com Publicação Avançada \x1b[0m");
                // Listar todas as publicações avançadas
                var publicacoesAvancadas = this._redeSocial
                    .listarTodasPublicacoes()
                    .filter(function (pub) {
                    return pub instanceof publicacaoAvancada_1.PublicacaoAvancada ||
                        publicacaoAvancada_1.PublicacaoAvancada.isPublicacaoAvancada(pub);
                });
                if (publicacoesAvancadas.length === 0) {
                    console.log("\n\u001B[33m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551   \u26A0\uFE0F N\u00E3o existem publica\u00E7\u00F5es avan\u00E7adas   \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
                    return;
                }
                // Mostrar publicações avançadas disponíveis
                console.log("\n📋 Publicações Avançadas Disponíveis:");
                publicacoesAvancadas.forEach(function (pub, index) {
                    console.log("\u001B[34m".concat(index + 1, ". ").concat(pub.conteudo.substring(0, 50), "...\u001B[0m"));
                });
                // Selecionar publicação para interagir
                var escolhaPublicacao = (0, auxFunctions_1.getNumber)("\n➤ Escolha o número da publicação: ") - 1;
                if (escolhaPublicacao < 0 ||
                    escolhaPublicacao >= publicacoesAvancadas.length) {
                    console.log("\n\u001B[31m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551   \u26A0\uFE0F Publica\u00E7\u00E3o inv\u00E1lida                 \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
                    return;
                }
                // Escolher tipo de interação
                console.log("\n\u001B[36m\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n\u2502 \uD83D\uDC4D Tipos de Intera\u00E7\u00E3o                   \u2502\n\u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524\n\u2502 \u001B[33m1\u001B[36m - \u001B[34m\uD83D\uDC4D Curtir                        \u001B[36m\u2502\n\u2502 \u001B[33m2\u001B[36m - \u001B[34m\uD83D\uDC4E N\u00E3o Curtir                   \u001B[36m\u2502\n\u2502 \u001B[33m3\u001B[36m - \u001B[34m\uD83D\uDE02 Riso                         \u001B[36m\u2502\n\u2502 \u001B[33m4\u001B[36m - \u001B[34m\uD83D\uDE2E Surpresa                     \u001B[36m\u2502\n\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\u001B[0m");
                var escolhaInteracao = (0, auxFunctions_1.getNumber)("\n➤ Escolha o tipo de interação: ");
                var tipoInteracao = void 0;
                switch (escolhaInteracao) {
                    case 1:
                        tipoInteracao = tipoInteracao_1.TipoInteracao.Curtir;
                        break;
                    case 2:
                        tipoInteracao = tipoInteracao_1.TipoInteracao.NaoCurtir;
                        break;
                    case 3:
                        tipoInteracao = tipoInteracao_1.TipoInteracao.Riso;
                        break;
                    case 4:
                        tipoInteracao = tipoInteracao_1.TipoInteracao.Surpresa;
                        break;
                    default:
                        console.log("\n\u001B[31m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551   \u26A0\uFE0F Intera\u00E7\u00E3o inv\u00E1lida                  \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
                        return;
                }
                // Criar interação
                var novaInteracao = new interacao_1.Interacao((0, ulid_1.ulid)(), tipoInteracao, this._perfilAtual.apelido);
                // Adicionar interação à publicação avançada
                var publicacaoSelecionada = publicacoesAvancadas[escolhaPublicacao];
                publicacaoSelecionada.adicionarInteracao(novaInteracao);
                // Salvar publicações
                (0, auxFunctions_1.salvarDadosPublicacoes)(this._redeSocial.listarTodasPublicacoes());
                console.log("\n\u001B[32m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551     \uD83C\uDF89 Intera\u00E7\u00E3o adicionada com sucesso! \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
            }
            else {
                console.log("\n\u001B[31m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551   \u26A0\uFE0F Apenas perfis avan\u00E7ados podem interagir com publica\u00E7\u00F5es. \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
                this.delay(3000);
            }
        }
        catch (error) {
            console.log("\n\u001B[31m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551   \u274C Erro ao interagir com publica\u00E7\u00E3o: ".concat(error.message, " \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m"));
        }
    };
    App.prototype.delay = function (ms) {
        var start = Date.now();
        while (Date.now() - start < ms) {
            // Espera ativamente
        }
    };
    return App;
}());
exports.App = App;
var app = new App();
app.start();

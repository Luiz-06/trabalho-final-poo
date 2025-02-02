"use strict";
exports.__esModule = true;
exports.RedeSocial = void 0;
var ulid_1 = require("ulid");
var auxFunctions_1 = require("../utils/auxFunctions");
var aux = require("../utils/auxFunctions");
var perfil_1 = require("./perfil");
var publicacao_1 = require("./publicacao");
var RedeSocial = /** @class */ (function () {
    //private _solicitacoesAmizade: Map<Perfil, Perfil>;
    function RedeSocial() {
        this._perfisCadastrados = (0, auxFunctions_1.carregarDadosPerfis)();
        this._publicacoesPostadas = (0, auxFunctions_1.carregarDadosPublicacoes)();
    }
    //PERFIL
    RedeSocial.prototype.buscarPerfil = function (apelidoProcurado) {
        // console.log(this._perfisCadastrados);
        return this._perfisCadastrados.find(function (perfil) { return perfil.apelido === apelidoProcurado && perfil.stats; });
    };
    RedeSocial.prototype.buscarPerfilPorID = function (id) {
        return this._perfisCadastrados.find(function (perfil) { return perfil.id === id && perfil.stats; });
    };
    RedeSocial.prototype.consultarPerfilPorIndice = function (apelido) {
        return this._perfisCadastrados.findIndex(function (perfil) { return perfil.apelido === apelido && perfil.stats; });
    };
    RedeSocial.prototype.adicionarPerfil = function (perfil) {
        this._perfisCadastrados.push(perfil);
    };
    RedeSocial.prototype.removerPerfil = function (apelidoProcurado) {
        var indexPerfil = this.consultarPerfilPorIndice(apelidoProcurado);
        if (indexPerfil !== -1) {
            var perfilRemovido = this._perfisCadastrados[indexPerfil];
            // this.deletarPublicacao(perfilRemovido);
            this.deletarPerfilDeAmigos(perfilRemovido);
            this._perfisCadastrados.splice(indexPerfil, 1);
        }
        else {
            console.log("Perfil não encontrado.");
        }
    };
    RedeSocial.prototype.deletarPerfilDeAmigos = function (perfilRemovido) {
        for (var _i = 0, _a = this._perfisCadastrados; _i < _a.length; _i++) {
            var perfil = _a[_i];
            perfil.removerAmigo(perfilRemovido.apelido);
        }
    };
    RedeSocial.prototype.listarPerfis = function () {
        var copiaDePerfis = [];
        for (var _i = 0, _a = this._perfisCadastrados; _i < _a.length; _i++) {
            var perfil = _a[_i];
            var perfilCopiado = new perfil_1.Perfil(perfil.id, perfil.apelido, perfil.email, perfil.foto, perfil.senha, perfil.stats, perfil.amigos, perfil.publicacoes, perfil.solicitacoesAmizade);
            copiaDePerfis.push(perfilCopiado);
        }
        return copiaDePerfis;
    };
    RedeSocial.prototype.ativarPerfil = function (apelido) {
        var perfilProcurado = this.buscarPerfil(apelido);
        if ((perfilProcurado === null || perfilProcurado === void 0 ? void 0 : perfilProcurado.stats) == false) {
            perfilProcurado.stats = true;
        }
        else {
            console.log("Perfil já se encontra ativado.");
        }
    };
    RedeSocial.prototype.desativarPerfil = function (apelido) {
        var perfilProcurado = this.buscarPerfil(apelido);
        if (perfilProcurado === null || perfilProcurado === void 0 ? void 0 : perfilProcurado.stats) {
            perfilProcurado.stats = false;
        }
        else {
            console.log("Perfil já se encontra desativado.");
        }
    };
    // PUBLICAÇÕES
    RedeSocial.prototype.criarPublicacao = function (apelidoPerfil) {
        var perfilAssociado = this.buscarPerfil(apelidoPerfil);
        if (!perfilAssociado) {
            console.log("Perfil não encontrado.");
            return;
        }
        var conteudo = aux.getData("Escreva sua publicação: ");
        var novaPublicacao = new publicacao_1.Publicacao((0, ulid_1.ulid)(), conteudo, new Date(), perfilAssociado.id);
        perfilAssociado.adicionarPublicacao(novaPublicacao);
        this._publicacoesPostadas.push(novaPublicacao);
        console.log("Publicação criada com sucesso!");
        return novaPublicacao;
    };
    RedeSocial.prototype.listarPublicacoes = function (apelidoPerfil) {
        var perfilAssociado = this.buscarPerfil(apelidoPerfil);
        if (!perfilAssociado) {
            console.log("Perfil não encontrado.");
            return [];
        }
        var pub = this._publicacoesPostadas;
        // .filter(
        //   (publicacao) => publicacao.perfilAssociado === perfilAssociado.id
        // );
        aux.print(pub);
    };
    RedeSocial.prototype.cpPublicacao = function () {
        var copiaDePublicacoes = [];
        for (var _i = 0, _a = this._publicacoesPostadas; _i < _a.length; _i++) {
            var pub = _a[_i];
            var publicacaoCP = new publicacao_1.Publicacao(pub.id, pub.conteudo, pub.dataHora, pub.perfilAssociado);
            copiaDePublicacoes.push(publicacaoCP);
        }
        return copiaDePublicacoes;
    };
    RedeSocial.prototype.listarTodasPublicacoes = function () {
        var _this = this;
        // this._publicacoesPostadas.forEach((pub) => aux.print(pub["_conteudo"]));
        this._publicacoesPostadas.map(function (pub) { var _a; return aux.print("".concat((_a = _this.buscarPerfilPorID(pub["_perfilAssociado"])) === null || _a === void 0 ? void 0 : _a.apelido, " publicou: ").concat(pub["_conteudo"])); });
    };
    // private deletarPublicacao(perfilRemovido: Perfil): void {
    //   this._publicacoesPostadas.filter(
    //     (postagem) => postagem.perfilAssociado. !== perfilRemovido.id
    //   );
    // }
    //SOLICITACOES
    RedeSocial.prototype.enviarSolicitacaoAmizade = function (apelidoRemetente, apelidoDestinatario) {
        var perfilRemetente = this.buscarPerfil(apelidoRemetente);
        var perfilDestinatario = this.buscarPerfil(apelidoDestinatario);
        if (perfilRemetente && perfilDestinatario) {
            perfilDestinatario.addCaixaDeSolicitacoes(perfilRemetente);
        }
    };
    return RedeSocial;
}());
exports.RedeSocial = RedeSocial;

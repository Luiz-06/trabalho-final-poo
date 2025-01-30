"use strict";
exports.__esModule = true;
exports.RedeSocial = void 0;
var auxFunctions_1 = require("../utils/auxFunctions");
var perfil_1 = require("./perfil");
var RedeSocial = /** @class */ (function () {
    //private _solicitacoesAmizade: Map<Perfil, Perfil>;
    function RedeSocial() {
        this._perfisCadastrados = (0, auxFunctions_1.carregarDadosPerfis)();
        this._publicacoesPostadas = (0, auxFunctions_1.carregarDadosPublicacoes)();
    }
    //PERFIL
    RedeSocial.prototype.buscarPerfil = function (apelidoProcurado) {
        // console.log(this._perfisCadastrados);
        return this._perfisCadastrados.find(function (perfil) { return perfil.apelido === apelidoProcurado; });
    };
    RedeSocial.prototype.consultarPerfilPorIndice = function (apelido) {
        return this._perfisCadastrados.findIndex(function (perfil) { return perfil.apelido === apelido; });
    };
    RedeSocial.prototype.adicionarPerfil = function (perfil) {
        this._perfisCadastrados.push(perfil);
    };
    RedeSocial.prototype.removerPerfil = function (apelidoProcurado) {
        var indexPerfil = this.consultarPerfilPorIndice(apelidoProcurado);
        if (indexPerfil !== -1) {
            var perfilRemovido = this._perfisCadastrados[indexPerfil];
            this.deletarPublicacao(perfilRemovido);
            this.deletarPerfilDeAmigos(perfilRemovido);
            this._perfisCadastrados.splice(indexPerfil, 1);
        }
        else {
            console.log("Perfil não encontrado.");
        }
    };
    //PUBLICACOES
    RedeSocial.prototype.deletarPublicacao = function (perfilRemovido) {
        this._publicacoesPostadas.filter(function (postagem) { return postagem.perfilAssociado.id !== perfilRemovido.id; });
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
        if ((perfilProcurado === null || perfilProcurado === void 0 ? void 0 : perfilProcurado.stats) == false) {
            perfilProcurado.stats = true;
        }
        else {
            console.log("Perfil já se encontra desativado.");
        }
    };
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

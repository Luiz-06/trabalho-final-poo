"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    RedeSocial.prototype.buscarPublicacao = function (idPublicacao) {
        return this._publicacoesPostadas.find(function (pub) { return pub["_id"] === idPublicacao; });
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
    //PUBLICACOES
    // private deletarPublicacao(perfilRemovido: Perfil): void {
    //   this._publicacoesPostadas.filter(
    //     (postagem) => postagem.perfilAssociado.id !== perfilRemovido.id
    //   );
    // }
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
    //PUBLICACOES
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
    RedeSocial.prototype.estaAssociada = function (publicacao) {
        return publicacao.perfilAssociado ? true : false;
    };
    RedeSocial.prototype.adicionarPublicacao = function (publicacao) {
        if (!this.estaAssociada(publicacao)) {
            console.log("Esta publicacao não está associada a nenhum perfil");
            return;
        }
        this._publicacoesPostadas.push(publicacao);
    };
    RedeSocial.prototype.listarPublicacoes = function (apelido) {
        var _this = this;
        // Return the list of publicações for the given user
        return this._publicacoesPostadas.filter(function (publicacao) {
            var perfil = _this.buscarPerfilPorID(publicacao["_perfilAssociado"]);
            return (perfil === null || perfil === void 0 ? void 0 : perfil.apelido) === apelido;
        });
    };
    RedeSocial.prototype.listarTodasPublicacoes = function () {
        // Return the list of all publicações
        return this._publicacoesPostadas;
    };
    RedeSocial.prototype.editarPublicacao = function (apelidoPerfil, idPublicacao, novoConteudo) {
        var perfil = this.buscarPerfil(apelidoPerfil);
        if (!perfil)
            return false;
        var publicacao = this.buscarPublicacao(idPublicacao);
        if (!publicacao || publicacao["_perfilAssociado"] !== perfil["_id"]) {
            console.log(!publicacao || publicacao["_perfilAssociado"] !== perfil["_id"]);
            return false;
        }
        publicacao["_conteudo"] = novoConteudo;
        console.log(publicacao);
        return true;
    };
    RedeSocial.prototype.deletarPublicacao = function (apelidoPerfil, idPublicacao) {
        var perfil = this.buscarPerfil(apelidoPerfil);
        if (!perfil)
            return false;
        var index = perfil.publicacoes.findIndex(function (p) { return p["_id"] === idPublicacao; });
        if (index === -1)
            return false;
        perfil.publicacoes.splice(index, 1);
        this._publicacoesPostadas = this._publicacoesPostadas.filter(function (p) { return p["_id"] !== idPublicacao; });
        return true;
    };
    // Para solicitações de amizade
    RedeSocial.prototype.listarSolicitacoes = function (apelido) {
        var perfil = this.buscarPerfil(apelido);
        return perfil ? perfil.solicitacoesAmizade : [];
    };
    RedeSocial.prototype.processarSolicitacao = function (apelidoUsuario, apelidoRemetente, aceitar) {
        var usuario = this.buscarPerfil(apelidoUsuario);
        var remetente = this.buscarPerfil(apelidoRemetente);
        if (usuario && remetente) {
            usuario.aceitarSolicitacao(remetente, aceitar);
            if (aceitar) {
                usuario.adicionarAmigo(remetente);
                remetente.adicionarAmigo(usuario);
            }
        }
    };
    //INTERAÇÕES
    // SOLICITAÇÕES DE AMIZADE
    RedeSocial.prototype.enviarSolicitacaoAmizade = function (apelidoRemetente, apelidoDestinatario) {
        var remetente = this.buscarPerfil(apelidoRemetente);
        var destinatario = this.buscarPerfil(apelidoDestinatario);
        if (remetente && destinatario) {
            destinatario.addCaixaDeSolicitacoes(remetente);
        }
    };
    RedeSocial.prototype.aceitarSolicitacaoAmizade = function (apelidoRemetente, apelidoDestinatario, aceitar) {
        var destinatario = this.buscarPerfil(apelidoDestinatario);
        var remetente = this.buscarPerfil(apelidoRemetente);
        if (remetente && destinatario) {
            destinatario.aceitarSolicitacao(remetente, aceitar);
        }
    };
    return RedeSocial;
}());
exports.RedeSocial = RedeSocial;

"use strict";
exports.__esModule = true;
exports.RedeSocial = void 0;
var ulid_1 = require("ulid");
var auxFunctions_1 = require("../utils/auxFunctions");
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
    RedeSocial.prototype.criarPublicacao = function (apelidoAutor) {
        var perfil = this.buscarPerfil(apelidoAutor);
        if (!perfil || !perfil.stats) {
            console.log("Não é possível criar publicação.");
            return null;
        }
        try {
            var novaPublicacao_1 = new publicacao_1.Publicacao((0, ulid_1.ulid)(), (0, auxFunctions_1.getData)("Digite o conteúdo da publicação (máximo 180 caracteres): "), new Date(), perfil.id);
            // Verifica se a publicação já existe
            var publicacaoExistente = this._publicacoesPostadas.find(function (p) { return p.id === novaPublicacao_1.id; });
            if (!publicacaoExistente) {
                this._publicacoesPostadas.push(novaPublicacao_1);
                perfil.adicionarPublicacao(novaPublicacao_1);
                (0, auxFunctions_1.salvarPublicacoes)(this._publicacoesPostadas);
            }
            return novaPublicacao_1;
        }
        catch (error) {
            console.log(error.message);
            return null;
        }
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
    RedeSocial.prototype.listarPublicacoes = function (apelidoAutor) {
        var perfil = this.buscarPerfil(apelidoAutor);
        if (!perfil)
            return [];
        return this._publicacoesPostadas.filter(function (p) { return p.perfilAssociado === perfil.id; });
    };
    RedeSocial.prototype.listarTodasPublicacoes = function () {
        return this._publicacoesPostadas;
    };
    RedeSocial.prototype.editarPublicacao = function (apelidoAutor, idPublicacao, novoConteudo) {
        var perfil = this.buscarPerfil(apelidoAutor);
        if (!perfil)
            return false;
        var publicacao = this._publicacoesPostadas.find(function (p) { return p.id === idPublicacao; });
        if (!publicacao || publicacao.perfilAssociado !== perfil.id)
            return false;
        try {
            publicacao.conteudo = novoConteudo;
            (0, auxFunctions_1.salvarPublicacoes)(this._publicacoesPostadas);
            return true;
        }
        catch (error) {
            console.log(error.message);
            return false;
        }
    };
    RedeSocial.prototype.deletarPublicacao = function (apelidoAutor, idPublicacao) {
        var perfil = this.buscarPerfil(apelidoAutor);
        if (!perfil)
            return false;
        var indexPublicacao = this._publicacoesPostadas.findIndex(function (p) { return p.id === idPublicacao; });
        if (indexPublicacao === -1 ||
            this._publicacoesPostadas[indexPublicacao].perfilAssociado !== perfil.id) {
            return false;
        }
        this._publicacoesPostadas.splice(indexPublicacao, 1);
        perfil.removerPublicacao(idPublicacao);
        (0, auxFunctions_1.salvarPublicacoes)(this._publicacoesPostadas);
        return true;
    };
    // Para solicitações de amizade
    RedeSocial.prototype.listarSolicitacoes = function (apelido) {
        var perfil = this.buscarPerfil(apelido);
        return perfil ? perfil.solicitacoesAmizade : [];
    };
    RedeSocial.prototype.processarSolicitacao = function (apelidoDestinatario, apelidoRemetente, aceitar) {
        var perfilDestinatario = this.buscarPerfil(apelidoDestinatario);
        var perfilRemetente = this.buscarPerfil(apelidoRemetente);
        if (!perfilDestinatario || !perfilRemetente) {
            console.log("Perfil não encontrado.");
            return false;
        }
        // Remove a solicitação independente do resultado
        perfilDestinatario.solicitacoesAmizade = perfilDestinatario.solicitacoesAmizade.filter(function (apelido) { return apelido !== apelidoRemetente; });
        if (aceitar) {
            // Verifica se já são amigos antes de adicionar
            if (!perfilDestinatario.amigos.includes(apelidoRemetente) &&
                !perfilRemetente.amigos.includes(apelidoDestinatario)) {
                perfilDestinatario.adicionarAmigo(apelidoRemetente);
                perfilRemetente.adicionarAmigo(apelidoDestinatario);
                console.log("\n\u001B[32m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551     \uD83E\uDD1D Amizade confirmada com sucesso!  \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
                return true;
            }
            else {
                console.log("\n\u001B[33m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551   \u26A0\uFE0F Voc\u00EAs j\u00E1 s\u00E3o amigos!               \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
                return false;
            }
        }
        return false;
    };
    //INTERAÇÕES
    // SOLICITAÇÕES DE AMIZADE
    RedeSocial.prototype.enviarSolicitacao = function (apelidoRemetente, apelidoDestinatario) {
        var perfilRemetente = this.buscarPerfil(apelidoRemetente);
        var perfilDestinatario = this.buscarPerfil(apelidoDestinatario);
        if (!perfilRemetente || !perfilDestinatario) {
            console.log("Perfil não encontrado.");
            return false;
        }
        // Verifica se já são amigos
        if (perfilRemetente.amigos.includes(apelidoDestinatario)) {
            console.log("\n\u001B[33m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551   \u26A0\uFE0F Voc\u00EAs j\u00E1 s\u00E3o amigos!               \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
            return false;
        }
        // Verifica se já existe solicitação pendente
        if (perfilDestinatario.solicitacoesAmizade.includes(apelidoRemetente)) {
            console.log("\n\u001B[33m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551   \u26A0\uFE0F Solicita\u00E7\u00E3o j\u00E1 enviada!            \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
            return false;
        }
        // Adiciona a solicitação
        perfilDestinatario.addCaixaDeSolicitacoes(apelidoRemetente);
        console.log("\n\u001B[32m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551     \uD83D\uDCE8 Solicita\u00E7\u00E3o enviada com sucesso! \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
        return true;
    };
    return RedeSocial;
}());
exports.RedeSocial = RedeSocial;

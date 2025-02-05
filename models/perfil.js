"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Perfil = void 0;
var publicacao_1 = require("./publicacao");
var Perfil = /** @class */ (function () {
    function Perfil(id, apelido, email, foto, senha, stats, amigos, publicacoes, solicitacoesAmizade) {
        this._id = id;
        this._apelido = apelido;
        this._email = email;
        this._foto = foto;
        this._senha = senha;
        this._stats = stats;
        this._amigos = amigos;
        this._publicacoes = publicacoes;
        this._solicitacoesAmizade = solicitacoesAmizade;
    }
    Object.defineProperty(Perfil.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Perfil.prototype, "apelido", {
        get: function () {
            return this._apelido;
        },
        set: function (value) {
            this._apelido = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Perfil.prototype, "email", {
        get: function () {
            return this._email;
        },
        set: function (value) {
            this._email = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Perfil.prototype, "stats", {
        get: function () {
            return this._stats;
        },
        set: function (value) {
            this._stats = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Perfil.prototype, "amigos", {
        get: function () {
            return this._amigos;
        },
        set: function (value) {
            this._amigos = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Perfil.prototype, "foto", {
        get: function () {
            return this._foto;
        },
        set: function (value) {
            this._foto = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Perfil.prototype, "senha", {
        get: function () {
            return this._senha;
        },
        set: function (value) {
            this._senha = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Perfil.prototype, "publicacoes", {
        get: function () {
            return this._publicacoes;
        },
        set: function (value) {
            this._publicacoes = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Perfil.prototype, "solicitacoesAmizade", {
        get: function () {
            return this._solicitacoesAmizade;
        },
        set: function (value) {
            this._solicitacoesAmizade = value;
        },
        enumerable: false,
        configurable: true
    });
    Perfil.prototype.adicionarAmigo = function (amigo) {
        this._amigos.push(amigo);
    };
    Perfil.prototype.removerAmigo = function (apelidoProcurado) {
        this._amigos = this._amigos.filter(function (apelido) { return apelido !== apelidoProcurado; });
    };
    // public listarAmigos(): Perfil[] {
    //   let copiaDeAmigos: Perfil[] = [];
    //   for (let amigo of this._amigos) {
    //     let perfilCopiado = new Perfil(
    //       amigo._id,
    //       amigo._apelido,
    //       amigo._email,
    //       amigo._foto,
    //       amigo._senha,
    //       amigo._stats,
    //       amigo._amigos,
    //       amigo._publicacoes,
    //       amigo._solicitacoesAmizade
    //     );
    //     copiaDeAmigos.push(perfilCopiado);
    //   }
    //   return copiaDeAmigos;
    // }
    Perfil.prototype.adicionarPublicacao = function (publicacao) {
        this._publicacoes.push(publicacao);
    };
    Perfil.prototype.removerPublicacao = function (id) {
        this._publicacoes = this._publicacoes.filter(function (publicacoes) { return publicacoes.id !== id; });
    };
    Perfil.prototype.listarPublicacoes = function () {
        var publicacoesCopiadas = [];
        for (var _i = 0, _a = this._publicacoes; _i < _a.length; _i++) {
            var publicacao = _a[_i];
            var copiaPub = new publicacao_1.Publicacao(publicacao.id, publicacao.conteudo, publicacao.dataHora, publicacao.perfilAssociado);
            publicacoesCopiadas.push(copiaPub);
        }
        return publicacoesCopiadas;
    };
    Perfil.prototype.addCaixaDeSolicitacoes = function (perfil) {
        this._solicitacoesAmizade.push(perfil);
    };
    // public aceitarSolicitacao(perfil: Perfil, aceitar: boolean) {
    //   this._solicitacoesAmizade = this._solicitacoesAmizade.filter(
    //     (perfilAtual) => perfilAtual.id !== perfil.id
    //   );
    //   if (aceitar) {
    //     this.adicionarAmigo(perfil);
    //   }
    // }
    Perfil.prototype.toString = function () {
        return "\nApelido = ".concat(this._apelido, "\nEmail = ").concat(this._email, "\nFoto = ").concat(this._foto, "\nSolicita\u00E7\u00F5es de amizade = ").concat(this._solicitacoesAmizade.length, "\n    ");
    };
    return Perfil;
}());
exports.Perfil = Perfil;

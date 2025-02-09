"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Publicacao = void 0;
var Publicacao = /** @class */ (function () {
    function Publicacao(id, conteudo, dataHora, perfilAssociado) {
        this.validarConteudo(conteudo);
        this._id = id;
        this._conteudo = conteudo;
        this._dataHora = dataHora;
        this._perfilAssociado = perfilAssociado;
    }
    Publicacao.prototype.validarConteudo = function (conteudo) {
        var MAX_CARACTERES = 180;
        if (conteudo.trim() === '') {
            throw new Error("\n\u001B[31m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551   \u26A0\uFE0F Publica\u00E7\u00E3o n\u00E3o pode ser vazia        \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
        }
        if (conteudo.length > MAX_CARACTERES) {
            throw new Error("\n\u001B[31m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551   \u26A0\uFE0F Limite de ".concat(MAX_CARACTERES, " caracteres excedido   \u2551\n\u2551   Sua publica\u00E7\u00E3o tem ").concat(conteudo.length, " caracteres     \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m"));
        }
    };
    Object.defineProperty(Publicacao.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Publicacao.prototype, "conteudo", {
        get: function () {
            return this._conteudo;
        },
        set: function (novoConteudo) {
            this.validarConteudo(novoConteudo);
            this._conteudo = novoConteudo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Publicacao.prototype, "dataHora", {
        get: function () {
            return this._dataHora;
        },
        set: function (value) {
            this._dataHora = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Publicacao.prototype, "perfilAssociado", {
        get: function () {
            return this._perfilAssociado;
        },
        set: function (value) {
            this._perfilAssociado = value;
        },
        enumerable: false,
        configurable: true
    });
    return Publicacao;
}());
exports.Publicacao = Publicacao;

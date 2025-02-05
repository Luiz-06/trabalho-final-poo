"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Publicacao = void 0;
var Publicacao = /** @class */ (function () {
    function Publicacao(id, conteudo, dataHora, perfilAssociado) {
        this._id = id;
        this._conteudo = conteudo;
        this._dataHora = dataHora;
        this._perfilAssociado = perfilAssociado;
    }
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
        set: function (value) {
            this._conteudo = value;
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

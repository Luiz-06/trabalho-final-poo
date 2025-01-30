"use strict";
exports.__esModule = true;
exports.Interacao = void 0;
var Interacao = /** @class */ (function () {
    function Interacao(id, tipoInteracao, perfilAutor) {
        this._id = id;
        this._tipoInteracao = tipoInteracao;
        this._perfilAutor = perfilAutor;
    }
    Object.defineProperty(Interacao.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Interacao.prototype, "tipoInteracao", {
        get: function () {
            return this._tipoInteracao;
        },
        set: function (value) {
            this._tipoInteracao = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Interacao.prototype, "perfilAutor", {
        get: function () {
            return this._perfilAutor;
        },
        set: function (value) {
            this._perfilAutor = value;
        },
        enumerable: false,
        configurable: true
    });
    return Interacao;
}());
exports.Interacao = Interacao;

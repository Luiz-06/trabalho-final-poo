"use strict";
exports.__esModule = true;
exports.Interacao = void 0;
var Interacao = /** @class */ (function () {
    function Interacao(id, tipo, perfilAutor) {
        this._id = id;
        this._tipo = tipo;
        this._perfilAutor = perfilAutor;
    }
    Object.defineProperty(Interacao.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Interacao.prototype, "tipo", {
        get: function () {
            return this._tipo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Interacao.prototype, "perfilAutor", {
        get: function () {
            return this._perfilAutor;
        },
        enumerable: false,
        configurable: true
    });
    return Interacao;
}());
exports.Interacao = Interacao;

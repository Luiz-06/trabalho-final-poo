"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.PublicacaoAvancada = void 0;
var publicacao_1 = require("./publicacao");
var tipoInteracao_1 = require("./tipoInteracao");
var PublicacaoAvancada = /** @class */ (function (_super) {
    __extends(PublicacaoAvancada, _super);
    function PublicacaoAvancada(id, conteudo, dataHora, perfilAssociado) {
        var _this = _super.call(this, id, conteudo, dataHora, perfilAssociado) || this;
        _this._interacoes = [];
        return _this;
    }
    PublicacaoAvancada.prototype.adicionarInteracao = function (interacao) {
        this._interacoes.push(interacao);
    };
    PublicacaoAvancada.prototype.listarInteracoes = function () {
        return this._interacoes;
    };
    PublicacaoAvancada.isPublicacaoAvancada = function (publicacao) {
        return publicacao._id.slice(0, 5) === 'SUPER';
    };
    PublicacaoAvancada.prototype.listarInteracoesDetalhadas = function () {
        return this._interacoes.map(function (interacao) {
            return "".concat(interacao.tipo, " por ").concat(interacao.perfilAutor);
        });
    };
    PublicacaoAvancada.prototype.contarInteracoesPorTipo = function () {
        var _a;
        var contagem = (_a = {},
            _a[tipoInteracao_1.TipoInteracao.Curtir] = 0,
            _a[tipoInteracao_1.TipoInteracao.NaoCurtir] = 0,
            _a[tipoInteracao_1.TipoInteracao.Riso] = 0,
            _a[tipoInteracao_1.TipoInteracao.Surpresa] = 0,
            _a);
        this._interacoes.forEach(function (interacao) {
            contagem[interacao.tipo]++;
        });
        return contagem;
    };
    return PublicacaoAvancada;
}(publicacao_1.Publicacao));
exports.PublicacaoAvancada = PublicacaoAvancada;

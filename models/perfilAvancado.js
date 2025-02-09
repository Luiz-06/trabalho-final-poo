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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerfilAvancado = void 0;
var perfil_1 = require("./perfil");
var ulid_1 = require("ulid");
var PerfilAvancado = /** @class */ (function (_super) {
    __extends(PerfilAvancado, _super);
    function PerfilAvancado(id, apelido, email, foto, senha, publicacoes, solicitacoesAmizade) {
        if (publicacoes === void 0) { publicacoes = []; }
        if (solicitacoesAmizade === void 0) { solicitacoesAmizade = []; }
        return _super.call(this, id, apelido, email, foto, senha, true, // stats está sempre como true
        [], // amigos começa como uma lista vazia
        publicacoes, []) || this;
    }
    // Método estático para criar perfil de administrador
    PerfilAvancado.criarPerfilAdministrador = function () {
        return new PerfilAvancado("SUPER" + (0, ulid_1.ulid)(), "adm", "administrador@redesocial.com", "admin.png", "adm", [], []);
    };
    // Método para identificar se é um perfil avançado
    PerfilAvancado.isPerfilAvancado = function (perfil) {
        return perfil._id.slice(0, 5) === 'SUPER';
    };
    // Método para criar um novo perfil avançado
    PerfilAvancado.criarNovoPerfilAvancado = function (apelido, email, senha) {
        return new PerfilAvancado("SUPER" + (0, ulid_1.ulid)(), apelido, email, "default.png", // Foto padrão
        senha);
    };
    // Método para editar um perfil comum
    PerfilAvancado.prototype.editarPerfilComum = function (perfil, novoApelido, novoEmail) {
        perfil.apelido = novoApelido;
        perfil.email = novoEmail;
    };
    // Método para excluir um perfil comum
    PerfilAvancado.prototype.excluirPerfilComum = function (redeSocial, apelido) {
        redeSocial.removerPerfil(apelido);
    };
    return PerfilAvancado;
}(perfil_1.Perfil));
exports.PerfilAvancado = PerfilAvancado;

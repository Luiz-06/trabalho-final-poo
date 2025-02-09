"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.possiveisErrosUsername = possiveisErrosUsername;
exports.validationTrocarApelido = validationTrocarApelido;
exports.validationEmail = validationEmail;
exports.validationTrocarSenha = validationTrocarSenha;
var aux = require("./../utils/auxFunctions");
function exist(apelido) {
    var perfisSalvos = aux.lerDadosPerfis();
    return perfisSalvos.some(function (perfil) { return perfil["_apelido"] === apelido; });
}
function validationTrocarSenha(senhaAtual) {
    var antigaSenha = aux.getData("Insira sua senha atual: ");
    if (senhaAtual !== antigaSenha) {
        aux.print("Senha incorreta");
        return false;
    }
    return true;
}
function validationTrocarApelido(apelido) {
    if (exist(apelido)) {
        console.error("O nome \"".concat(apelido, "\" j\u00E1 est\u00E1 em uso. Por favor, escolha outro."));
        return false;
    }
    return true;
}
function existEmail(email) {
    var perfisSalvos = aux.lerDadosPerfis();
    return perfisSalvos.some(function (perfil) { return perfil["_email"] === email; });
}
function validationEmail(email) {
    if (existEmail(email)) {
        console.error("O email \"".concat(email, "\" j\u00E1 est\u00E1 em uso. Por favor, escolha outro."));
        return false;
    }
    return true;
}
function possiveisErrosUsername(apelido) {
    if (exist(apelido))
        throw new Error("O nome \"".concat(apelido, "\" j\u00E1 est\u00E1 em uso. Por favor, escolha outro."));
}

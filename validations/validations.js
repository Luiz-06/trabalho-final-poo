"use strict";
exports.__esModule = true;
exports.validationTrocarSenha = exports.validationEmail = exports.validationTrocarApelido = exports.possiveisErrosUsername = void 0;
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
exports.validationTrocarSenha = validationTrocarSenha;
function validationTrocarApelido(apelido) {
    if (exist(apelido)) {
        console.error("O nome \"".concat(apelido, "\" j\u00E1 est\u00E1 em uso. Por favor, escolha outro."));
        return false;
    }
    return true;
}
exports.validationTrocarApelido = validationTrocarApelido;
function validationEmail(email) {
    if (exist(email)) {
        console.error("O email \"".concat(email, "\" j\u00E1 est\u00E1 em uso. Por favor, escolha outro."));
        return false;
    }
    return true;
}
exports.validationEmail = validationEmail;
function possiveisErrosUsername(apelido) {
    if (exist(apelido))
        throw new Error("O nome \"".concat(apelido, "\" j\u00E1 est\u00E1 em uso. Por favor, escolha outro."));
}
exports.possiveisErrosUsername = possiveisErrosUsername;

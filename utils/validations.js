"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSenha = void 0;
var validationSenha = function (senha) {
    if (senha.length < 8) {
        throw new Error("\n\u001B[31m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551   \u26A0\uFE0F A senha deve ter no m\u00EDnimo 8 caracteres \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
    }
    // Critérios adicionais de senha forte (opcional)
    var temMaiuscula = /[A-Z]/.test(senha);
    var temMinuscula = /[a-z]/.test(senha);
    var temNumero = /[0-9]/.test(senha);
    var temEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);
    if (!(temMaiuscula && temMinuscula && temNumero && temEspecial)) {
        console.log("\n\u001B[33m\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                          \u2551\n\u2551   \u26A0\uFE0F Recomenda\u00E7\u00E3o: Senha mais forte      \u2551\n\u2551   Inclua mai\u00FAsculas, min\u00FAsculas,         \u2551\n\u2551   n\u00FAmeros e caracteres especiais         \u2551\n\u2551                                          \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u001B[0m");
    }
    return true;
};
exports.validationSenha = validationSenha;

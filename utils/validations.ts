export const validationSenha = (senha: string): boolean => {
    if (senha.length < 8) {
        throw new Error(`
\x1b[31m╔══════════════════════════════════════════╗
║                                          ║
║   ⚠️ A senha deve ter no mínimo 8 caracteres ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
    }

    // Critérios adicionais de senha forte (opcional)
    const temMaiuscula = /[A-Z]/.test(senha);
    const temMinuscula = /[a-z]/.test(senha);
    const temNumero = /[0-9]/.test(senha);
    const temEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);

    if (!(temMaiuscula && temMinuscula && temNumero && temEspecial)) {
        console.log(`
\x1b[33m╔══════════════════════════════════════════╗
║                                          ║
║   ⚠️ Recomendação: Senha mais forte      ║
║   Inclua maiúsculas, minúsculas,         ║
║   números e caracteres especiais         ║
║                                          ║
╚══════════════════════════════════════════╝\x1b[0m`);
    }

    return true;
}; 
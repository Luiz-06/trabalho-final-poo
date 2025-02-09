import * as aux from "./../utils/auxFunctions";


function exist(apelido: string): boolean {
    const perfisSalvos = aux.lerDadosPerfis();
    return perfisSalvos.some(perfil => perfil["_apelido"] === apelido);
}


function validationTrocarSenha(senhaAtual: string) : boolean {
    const antigaSenha = aux.getData("Insira sua senha atual: ");
    if (senhaAtual !== antigaSenha){
        aux.print("Senha incorreta")
        return false
    }
    return true
}


function validationTrocarApelido(apelido: string) : void | boolean{
    if (exist(apelido)){
        console.error(`O nome "${apelido}" já está em uso. Por favor, escolha outro.`);
        return false
    }
    return true
}

function existEmail(email: string): boolean {
    const perfisSalvos = aux.lerDadosPerfis();
    return perfisSalvos.some(perfil => perfil["_email"] === email);
}
function validationEmail(email: string) : void | boolean{
    if (existEmail(email)){
        console.error(`O email "${email}" já está em uso. Por favor, escolha outro.`);
        return false
    }
    return true
}


function possiveisErrosUsername(apelido: string){
    if (exist(apelido))
        throw new Error(`O nome "${apelido}" já está em uso. Por favor, escolha outro.`);
}




export {
    possiveisErrosUsername,
    validationTrocarApelido,
    validationEmail,
    validationTrocarSenha
    
}


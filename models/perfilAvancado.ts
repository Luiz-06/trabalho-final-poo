import { Perfil } from "./perfil.ts"

class PerfilAvancado extends Perfil {
    constructor(apelido: string, email: string, foto: string) {
        super(apelido, email, foto)

        this.stats = true
        this.amigos = []
    }

    public habDesabPerfis(apelido: string): void{
        let perfilBuscado: Perfil | undefined = super.amigos.find(perfil => perfil.apelido === apelido) 
    
        if(perfilBuscado) {
            perfilBuscado.stats = false
            console.log("Perfil desativado.")
        }else {
            console.log("Perfil não encontrado.")
        }
    }
}
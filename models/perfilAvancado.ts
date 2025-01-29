import { Perfil } from "./perfil.ts";

export class PerfilAvancado extends Perfil {
  constructor(id: number, apelido: string, email: string, foto: string) {
    super(id, apelido, email, foto);
  }

  public habDesabPerfis(apelido: string): void {
    let perfilBuscado = this.amigos.find(perfil => perfil.apelido === apelido);
    
    if (perfilBuscado) {
      perfilBuscado.stats = !perfilBuscado.stats;
      console.log(`Perfil ${perfilBuscado.stats ? "ativado" : "desativado"}.`);
    } else {
      console.log("Perfil não encontrado.");
    }
  }
  
}

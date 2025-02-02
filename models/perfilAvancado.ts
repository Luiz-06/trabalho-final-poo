import { Perfil } from "./perfil";
import { Publicacao } from "./publicacao";

export class PerfilAvancado extends Perfil {
  constructor(
    id: string, 
    apelido: string, 
    email: string, 
    foto: string, 
    senha: string, 
    publicacoes: Publicacao[] = [], 
    solicitacoesAmizade: Perfil[] = []
  ) {
    super(
      id, 
      apelido, 
      email, 
      foto, 
      senha, 
      true, // stats está sempre como true
      [], // amigos começa como uma lista vazia
      publicacoes, 
      solicitacoesAmizade
    );
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

import { Perfil } from "./perfil";
import { Publicacao } from "./publicacao";
import { ulid } from "ulid";

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
      []
    );
  }

  // Método estático para criar perfil de administrador
  public static criarPerfilAdministrador(): PerfilAvancado {
    return new PerfilAvancado(
      "SUPER" + ulid(), 
      "adm", 
      "administrador@redesocial.com", 
      "admin.png", 
      "adm",
      [],
      []
    );
  }
  
  // Método para identificar se é um perfil avançado
  public static isPerfilAvancado(perfil: any): boolean {
    return perfil._id.slice(0, 5) === 'SUPER'; }

  // Método para criar um novo perfil avançado
  public static criarNovoPerfilAvancado(apelido: string, email: string, senha: string): PerfilAvancado {
    return new PerfilAvancado(
      "SUPER" + ulid(),
      apelido,
      email,
      "default.png", // Foto padrão
      senha
    );
  }

  // Método para editar um perfil comum
  public editarPerfilComum(perfil: Perfil, novoApelido: string, novoEmail: string): void {
    perfil.apelido = novoApelido;
    perfil.email = novoEmail;
  }

  // Método para excluir um perfil comum
  public excluirPerfilComum(redeSocial: any, apelido: string): void {
    redeSocial.removerPerfil(apelido);
  }
}

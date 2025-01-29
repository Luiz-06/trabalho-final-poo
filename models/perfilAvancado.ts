import { Perfil } from "./perfil.ts";

export class PerfilAvancado extends Perfil {
  constructor(id: number, apelido: string, email: string, foto: string) {
    super(id, apelido, email, foto);

    this.stats = true;
    this.amigos = [];
  }

  public habDesabPerfis(apelido: string): void {
    let perfilBuscado: Perfil | undefined = super.amigos.find(
      (perfil) => perfil.apelido === apelido
    );

    if (perfilBuscado) {
      perfilBuscado.stats = false;
      console.log("Perfil desativado.");
    } else {
      console.log("Perfil não encontrado.");
    }
  }
}

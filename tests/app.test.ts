import { App } from "../app";
import { Perfil } from "../models/perfil";
import { PerfilAvancado } from "../models/perfilAvancado";
import { RedeSocial } from "../models/redeSocial";

describe("Testes da Aplicação de Rede Social", () => {
  let app: App;
  let redeSocial: RedeSocial;

  beforeEach(() => {
    redeSocial = new RedeSocial();
    app = new App();
  });

  test("Deve criar um novo perfil comum", () => {
    const perfil = new Perfil("1", "usuario", "email@teste.com", "foto.png", "senha123", true, [], [], []);
    redeSocial.adicionarPerfil(perfil);
    expect(redeSocial.buscarPerfil("usuario")).toBeDefined();
  });

  test("Deve criar um novo perfil avançado", () => {
    const perfilAvancado = PerfilAvancado.criarNovoPerfilAvancado("admin", "admin@teste.com", "senhaAdmin");
    redeSocial.adicionarPerfil(perfilAvancado);
    expect(redeSocial.buscarPerfil("admin")).toBeDefined();
  });

//   test("Deve falhar ao criar publicação com mais de 180 caracteres", () => {
//     const perfil = new Perfil("1", "usuario", "email@teste.com", "foto.png", "senha123", true, [], [], []);
//     redeSocial.adicionarPerfil(perfil);
//     const conteudoLongo = "a".repeat(181);
//     expect(() => {
//       redeSocial.criarPublicacao(perfil.apelido, conteudoLongo);
//     }).toThrow("Limite de 180 caracteres excedido");
//   });

//   test("Deve permitir login apenas para perfis avançados no gerenciamento de perfis", () => {
//     const perfilAvancado = PerfilAvancado.criarNovoPerfilAvancado("admin", "admin@teste.com", "senhaAdmin");
//     redeSocial.adicionarPerfil(perfilAvancado);
//     app.loginPerfilAvancado("admin", "senhaAdmin");
//     expect(app.isLoggedIn()).toBe(true);
//   });

  // Adicione mais testes conforme necessário
}); 
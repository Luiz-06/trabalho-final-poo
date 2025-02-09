import { App } from '../app';
import { Perfil } from '../models/perfil';
import { PerfilAvancado } from '../models/perfilAvancado';
import { RedeSocial } from '../models/redeSocial';

describe('App', () => {
  let app: App;
  let redeSocial: RedeSocial;

  beforeEach(() => {
    redeSocial = new RedeSocial();
    app = new App();
  });

  test('Deve criar um novo perfil comum', () => {
    const perfil = new Perfil('1', 'usuario', 'usuario@example.com', 'foto.png', 'senha123', true, [], [], []);
    redeSocial.adicionarPerfil(perfil);
    expect(redeSocial.buscarPerfil('usuario')).toBeDefined();
  });

  test('Deve criar um novo perfil avançado', () => {
    const perfilAvancado = PerfilAvancado.criarNovoPerfilAvancado('admin', 'admin@example.com', 'senhaAdmin');
    redeSocial.adicionarPerfil(perfilAvancado);
    expect(redeSocial.buscarPerfil('admin')).toBeDefined();
  });

  test('Deve falhar ao criar um perfil com apelido duplicado', () => {
    const perfil1 = new Perfil('1', 'usuario', 'usuario1@example.com', 'foto1.png', 'senha123', true, [], [], []);
    const perfil2 = new Perfil('2', 'usuario', 'usuario2@example.com', 'foto2.png', 'senha456', true, [], [], []);
    redeSocial.adicionarPerfil(perfil1);
    expect(() => redeSocial.adicionarPerfil(perfil2)).toThrowError('Apelido já existe');
  });

  test('Deve criar uma publicação', () => {
    const perfil = new Perfil('1', 'usuario', 'usuario@example.com', 'foto.png', 'senha123', true, [], [], []);
    redeSocial.adicionarPerfil(perfil);
    const publicacao = redeSocial.criarPublicacao('usuario');
    expect(publicacao).not.toBeNull();
  });

  test('Deve falhar ao criar uma publicação com mais de 180 caracteres', () => {
    const perfil = new Perfil('1', 'usuario', 'usuario@example.com', 'foto.png', 'senha123', true, [], [], []);
    redeSocial.adicionarPerfil(perfil);
    expect(() => {
      redeSocial.criarPublicacao('usuario', 'a'.repeat(181));
    }).toThrowError('Limite de 180 caracteres excedido');
  });

  test('Deve enviar uma solicitação de amizade', () => {
    const perfil1 = new Perfil('1', 'usuario1', 'usuario1@example.com', 'foto1.png', 'senha123', true, [], [], []);
    const perfil2 = new Perfil('2', 'usuario2', 'usuario2@example.com', 'foto2.png', 'senha456', true, [], [], []);
    redeSocial.adicionarPerfil(perfil1);
    redeSocial.adicionarPerfil(perfil2);
    const resultado = redeSocial.enviarSolicitacao('usuario1', 'usuario2');
    expect(resultado).toBe(true);
  });

  test('Deve aceitar uma solicitação de amizade', () => {
    const perfil1 = new Perfil('1', 'usuario1', 'usuario1@example.com', 'foto1.png', 'senha123', true, [], [], []);
    const perfil2 = new Perfil('2', 'usuario2', 'usuario2@example.com', 'foto2.png', 'senha456', true, [], [], []);
    redeSocial.adicionarPerfil(perfil1);
    redeSocial.adicionarPerfil(perfil2);
    redeSocial.enviarSolicitacao('usuario1', 'usuario2');
    const resultado = redeSocial.processarSolicitacao('usuario2', 'usuario1', true);
    expect(resultado).toBe(true);
  });
}); 
# 🧪 Plano de Testes para Rede Social

## 📋 Checklist de Testes

### 🔐 Autenticação
- [x] Login com credenciais válidas
- [ ] Login com credenciais inválidas
- [ ] Recuperação de senha
- [ ] Login automático (modo secreto)

### 👤 Gerenciamento de Perfil
- [ ] Criar novo perfil
- [ ] Alterar apelido
- [ ] Alterar email
- [ ] Alterar foto de perfil
- [ ] Alterar senha
- [ ] Desativar conta
- [ ] Reativar conta

### 📝 Publicações
- [ ] Criar publicação
- [ ] Listar publicações próprias
- [ ] Editar publicação
- [ ] Excluir publicação
- [ ] Visualizar todas as publicações
- [ ] Verificar persistência de publicações

### 👥 Solicitações de Amizade
- [ ] Enviar solicitação de amizade
- [ ] Visualizar solicitações
- [ ] Aceitar solicitação
- [ ] Recusar solicitação
- [ ] Remover amigo

### 🔒 Validações
- [ ] Validar criação de usuário
- [ ] Validar email
- [ ] Validar tamanho da senha
- [ ] Validar caracteres especiais em apelido

### 💾 Persistência de Dados
- [ ] Salvar perfis
- [ ] Salvar publicações
- [ ] Carregar perfis
- [ ] Carregar publicações
- [ ] Manter dados entre sessões

### 🚫 Casos de Erro
- [ ] Tentar criar perfil com apelido existente
- [ ] Tentar publicar em perfil desativado
- [ ] Enviar solicitação para perfil inexistente
- [ ] Editar publicação de outro usuário

### 🌐 Interações Avançadas
- [ ] Verificar limite de caracteres em publicações
- [ ] Testar emojis em publicações
- [ ] Verificar formatação de data/hora

## 🏆 Critérios de Sucesso
- Todos os testes devem passar sem erros
- Dados devem ser persistidos corretamente
- Experiência do usuário deve ser intuitiva
- Segurança das informações do usuário

## 🛠 Ferramentas Recomendadas
- Console do Node.js
- Debugger do VS Code
- Postman (para testes de API, se aplicável)

## 📊 Relatório de Testes
Após realizar os testes, preencha:
- Total de testes: 
- Testes passados: 
- Testes com falha: 
- Observações: 

## 🐛 Reportar Bugs
Encontrou algum problema? [Crie uma issue no GitHub](link-para-issues) 
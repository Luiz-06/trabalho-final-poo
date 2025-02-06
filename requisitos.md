## 1) Implementação das Classes Básicas (2,0 pontos)

### Classe Perfil:
**Atributos:**
- ID único
- Apelido
- Foto (emojis)
- Email
- Status (ativo/inativo)
- Array de amigos
- Array de postagens

**Métodos:**
- Adicionar amigo
- Remover amigo
- Adicionar publicação
- Listar amigos
- Listar postagens
- Ativar/desativar perfil

### Classe PerfilAvancado:
**Herança da classe Perfil.**

**Método:**
- Habilitar ou desabilitar outros perfis

### Classe Publicacao:
**Atributos:**
- ID único
- Conteúdo
- Data/hora da publicação
- Perfil associado

### Classe PublicacaoAvancada:
**Herança da classe Publicacao.**

**Atributo:**
- Lista de interações

**Métodos:**
- Adicionar interação
- Listar interações

### Classe Interacao:
**Atributos:**
- ID único
- Tipo de interação (emoji)
- Perfil autor da interação

### Enumeração TipoInteracao:
**Valores permitidos:**
- "curtir", "não curtir", "riso", "surpresa" representados através de emojis.

**Observação:** Criar as classes com atributos privados, inicializados nos construtores e com métodos de leitura e escrita, quando necessários.

---

## 2) Implementação da Classe RedeSocial (2,0 pontos)

### Atributos:
- Array de perfis cadastrados
- Array de todas as publicações da rede social
- Mapa de solicitações de amizade pendentes (`map<Perfil, Perfil>`)

### Métodos:

#### Gerenciamento de Perfis:
- Adicionar perfil
- Buscar perfil por email, apelido ou ID
- Listar todos os perfis
- Ativar/desativar perfil por meio de perfil avançado

#### Gerenciamento de Publicações:
- Adicionar publicação simples ou avançada associadas a perfis
- Listar publicações ordenadas em ordem decrescente, podendo ser filtradas por perfil

#### Gerenciamento de Solicitações:
- Enviar solicitações de amizade
- Aceitar solicitações
- Recusar solicitações

#### Gerenciamento de Interações:
- Adicionar interações a publicações avançadas, garantindo que um usuário não interaja mais de uma vez na mesma publicação

**Observação:** Nessa classe, devem ser passados aos métodos preferencialmente IDs, apelidos, e-mails ou outros atributos únicos para manipulação.

---

## 3) Simulação Interativa (2,0 pontos)

- Implemente uma interface interativa que permita executar os métodos de gerenciamento de perfis, publicações, solicitações e interações;
- Utilize uma interface de terminal que permita ao usuário informar as opções e fornecer os dados necessários;
- Liste opções para o usuário escolher previamente, minimizando a necessidade de memorizar identificadores;
- Forneça feedback a cada interação, informando sucesso ou erro;
- Para funcionalidades críticas, solicite confirmação antes de executar ações.

---

## 4) Persistência de Dados (2,0 pontos)

### Salvar Dados em Arquivo:
- Perfis e publicações devem ser salvos em arquivos JSON, separados por tipo e evitando redundância.

### Recuperar Dados de Arquivo:
- Os dados salvos devem ser lidos e reconstruídos em memória, preservando as associações entre perfis e publicações.

---

## 5) Validações e Tratamento de Exceções (2,0 pontos)

### Gerenciamento de Perfis:
- IDs ou emails duplicados devem lançar a exceção `PerfilJaCadastradoError`
- Perfis normais tentando ativar/desativar status de outro perfil devem lançar a exceção `PerfilNaoAutorizadoError`

### Gerenciamento de Publicações:
- Perfis inativos tentando criar publicações devem lançar a exceção `PerfilInativoError`
- Interações duplicadas devem lançar a exceção `InteracaoDuplicadaError`

### Gerenciamento de Solicitações:
- Amizades duplicadas devem lançar a exceção `AmizadeJaExistenteError`

### Gerenciamento de Interações:
- Interações duplicadas devem lançar a exceção `InteracaoDuplicadaError`

### Entradas de Dados Inválidas e Outras Exceções:
- Lançar a exceção `ValorInvalidoException` quando um valor inapropriado for informado.
- Capturar outros erros de forma genérica e apropriada, exibindo uma mensagem amigável.

**Observação:** A aplicação nunca deve parar de executar devido a erros não tratados.

---

## 6) Interface de Login e Autenticação

### Tela Inicial:
- Exibir uma mensagem de boas-vindas com o nome da rede social.
- Mostrar um menu com as seguintes opções:
  1. **Login**
  2. **Criar Conta**
  3. **Recuperar Senha**
  4. **Sair**

### Login:
- Solicitar e-mail e senha do usuário.
- Validar credenciais e exibir mensagens de erro caso os dados sejam incorretos.
- Caso o login seja bem-sucedido, redirecionar para o menu principal.

### Criar Conta:
- Solicitar nome de usuário, e-mail, senha e uma foto representada por um emoji.
- Verificar se o e-mail já está cadastrado.
- Criar o perfil com status ativo e exibir uma mensagem de sucesso.

### Recuperar Senha:
- Solicitar o e-mail do usuário.
- Simular o envio de um código de recuperação.
- Pedir para o usuário inserir um novo código e redefinir a senha.
- Exibir mensagem de sucesso ao finalizar a recuperação.

### Sair:
- Exibir uma mensagem de despedida e encerrar o programa.

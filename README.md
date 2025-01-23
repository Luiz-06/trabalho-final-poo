# 🌐 Projeto: Rede Social Interativa

Bem-vindo ao repositório do **Projeto Rede Social Interativa**! Este projeto tem como objetivo implementar uma rede social simplificada com funcionalidades de gerenciamento de perfis, publicações, interações e solicitações de amizade. O sistema é interativo e persistente, utilizando **txt** para armazenamento de dados e boas práticas de desenvolvimento para garantir robustez e escalabilidade. 🚀

---

## 📋 Funcionalidades

### 🎭 Gerenciamento de Perfis

- **Adicionar perfis:** Crie novos perfis com apelido, email, status e outros dados.
- **Buscar perfis:** Pesquise perfis por ID, apelido ou email.
- **Listar perfis:** Exiba todos os perfis cadastrados.
- **Ativar/Desativar perfis:** Permita perfis avançados gerenciar o status de outros.

### 📝 Gerenciamento de Publicações

- **Adicionar publicações:** Crie publicações simples ou avançadas associadas a perfis.
- **Listar publicações:** Exiba as publicações em ordem decrescente, filtrando por perfil, se necessário.

### 🤝 Gerenciamento de Solicitações de Amizade

- **Enviar solicitações:** Envie pedidos de amizade para outros perfis.
- **Aceitar/Recusar solicitações:** Gerencie as solicitações pendentes.

### 💬 Gerenciamento de Interações

- **Adicionar interações:** Perfis podem reagir a publicações avançadas com emojis (curtir, não curtir, riso, surpresa).
- **Evitar duplicidades:** Garanta que um perfil não interaja mais de uma vez na mesma publicação.

### 💾 Persistência de Dados

- Salve e recupere perfis e publicações em arquivos **txt**.
- Relacione os dados corretamente entre perfis e publicações durante a leitura.

### ⚠️ Tratamento de Exceções

- **Exceções personalizadas:**
  - `PerfilJaCadastradoError`: IDs ou emails duplicados.
  - `PerfilNaoAutorizadoError`: Perfis normais tentando alterar status de outros perfis.
  - `PerfilInativoError`: Perfis inativos tentando criar publicações.
  - `InteracaoDuplicadaError`: Tentativas de interações repetidas.
  - `AmizadeJaExistenteError`: Solicitações ou amizades duplicadas.
  - `ValorInvalidoException`: Entradas de dados inválidas.
- **Tratamento genérico:** Nunca deixe a aplicação parar por erros não tratados.

---

## 🛠️ Tecnologias Utilizadas

- **Linguagem:** Typescript
- **Persistência:** Arquivos txt 📂
- **Interface:** Linha de comando interativa (CLI) 🖥️
- **Estrutura:** Orientação a objetos com herança e boas práticas de encapsulamento.

---

## 🚀 Como Executar

### 1️⃣ Pré-requisitos

- Node 18 +

### 2️⃣ Clonando o Repositório

```bash
# Clone este repositório
git clone https://github.com/luiz-06/trabalho-final-poo.git

# Acesse o diretório do projeto
cd trabalho-final-poo
```

### 3️⃣ Executando o Projeto

```bash
# Execute o arquivo principal
node app.ts
```

### 4️⃣ Interatividade

Siga as opções do menu interativo para explorar as funcionalidades do sistema. 🎮

---

## 📂 Estrutura do Projeto

```plaintext
📦trabalho-final-poo
 ┣ 📂models
 ┃ ┣ 📜perfil.ts
 ┃ ┣ 📜perfilAvancado.ts
 ┃ ┣ 📜publicacao.ts
 ┃ ┗ 📜publicacaoAvancada.ts
 ┣ 📂resources
 ┃ ┣ 📜perfis.txt
 ┃ ┣ 📜publicacoes.txt
 ┃ ┗ ...
 ┣ 📂utils
 ┃ ┣ 📜types.ts
 ┣ 📜app.ts  # Entrada principal da aplicação
 ┗ 📜README.md  # Documentação do projeto
```

---

## 🎥 Demonstração

| Em desenvolvimento

Confira o vídeo de apresentação do projeto [](). 🎬

---

## 🏆 Equipe

| Nome                                               |
| -------------------------------------------------- |
| [Luiz Felipe](https://github.com/luiz-06)          |
| [Gisele Santos](https://github.com/giselebcsantos) |
| [Pedro Guilherme](https://github.com/kovokar)      |

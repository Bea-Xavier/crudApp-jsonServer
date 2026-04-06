# 📱 Aplicativo CRUD de Pessoas

Esta é uma aplicação mobile desenvolvida em **React Native com Expo** para gerenciar um cadastro de contatos (pessoas). O app realiza as operações básicas de um CRUD — **Criar, Ler, Atualizar e Deletar** — consumindo uma API local simulada com **JSON Server**, exposta publicamente através do **LocalTunnel**.

---

## 📋 Descrição do Projeto

O aplicativo permite gerenciar uma lista de contatos de forma simples e visual. O usuário pode visualizar todos os cadastros, buscar por nome, adicionar novas pessoas, editar dados existentes e excluir registros — tudo isso diretamente pelo celular, comunicando-se com um backend fake rodando no computador.

### Como o problema foi resolvido

A aplicação foi dividida em duas partes:

- **Backend (fake):** Um servidor REST local criado com o **JSON Server**, que lê e persiste os dados em um arquivo `db.json`. Para que o aplicativo mobile consiga acessar esse servidor a partir de qualquer rede (inclusive dados móveis), o **LocalTunnel** é usado para gerar uma URL pública apontando para o servidor local.

- **Frontend (mobile):** O aplicativo em React Native consome essa URL pública via `fetch`, realizando as operações de CRUD. A navegação entre telas é feita com **React Navigation (Stack Navigator)**, e os ícones visuais utilizam a biblioteca **Lucide React Native**.

---

## ⚙️ Funcionalidades

💠 **Listagem** de todos os contatos cadastrados no banco de dados;

💠 **Busca por nome** com debounce, filtrando os contatos em tempo real;

💠 **Adição** de novas pessoas via formulário;

💠 **Edição** dos dados de um contato existente;

💠 **Exclusão** de um contato diretamente pelo card da lista.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Finalidade |
|---|---|
| **React Native** | Construção da interface mobile |
| **Expo** | Ambiente de desenvolvimento e execução do app |
| **JSON Server** | Simulação de uma API REST com banco de dados fake (`db.json`) |
| **LocalTunnel** | Exposição do servidor local via URL pública acessível pelo celular |
| **React Navigation** | Navegação entre telas (Stack Navigator) |
| **Lucide React Native** | Biblioteca de ícones |

💠 React Native &nbsp;|&nbsp; 💠 Expo &nbsp;|&nbsp; 💠 JSON Server &nbsp;|&nbsp; 💠 LocalTunnel

[![My Skills](https://skillicons.dev/icons?i=git,nodejs,js,npm,vscode&theme=dark)](https://skillicons.dev)

---

## 🖥️ Configuração do Ambiente

Antes de começar, certifique-se de ter instalado em sua máquina:

- [**Node.js**](https://nodejs.org/en) (versão recomendada: LTS)
- [**Expo Go**](https://expo.dev/client) instalado no seu celular (Android ou iOS)
- **npm** (já vem junto com o Node.js)

---

## 📦 Instalação

**1.** Clone o repositório:

```bash
git clone https://github.com/Bea-Xavier/crudApp-jsonServer.git
cd crudApp-jsonServer
```

**2.** Instale as dependências do **frontend**:

```bash
cd frontend/meuCrudApp
npm install
```

**3.** Instale as dependências do **backend** (JSON Server e LocalTunnel):

```bash
cd ../../backend
npm install -g json-server
npm install -g localtunnel
```

---

## ▶️ Execução

### 1. Iniciar o backend (JSON Server)

Na pasta `backend/`, execute:

```bash
npx json-server --watch db.json --port 3000
```

O servidor estará rodando em `http://localhost:3000`.

### 2. Expor o servidor com LocalTunnel

Em outro terminal, execute:

```bash
npx lt --port 3000
```

O LocalTunnel irá gerar uma URL pública no formato:

```
https://xxxx-xxxx-xxxx.loca.lt
```

> ⚠️ **Importante:** Copie essa URL gerada. Ela muda a cada vez que você inicia o LocalTunnel.

Na primeira vez que for executar o LocalTunnel, será preciso abrir o site da URL gerada por ele, e fornecer o IP Público de sua máquina (o próprio site te facilita o caminho para a obtenção dessa informação) para o lt poder reconhecer a sua máquina em si, e então assim a URL ser autorizada a fazer a ponte entre frontend e backend.

### 3. Atualizar a URL no app

Abra o arquivo `frontend/meuCrudApp/src/servers/configApi.js` e substitua o valor de `API_URL` pela URL gerada pelo LocalTunnel:

```js
export const API_URL = 'https://sua-url-gerada.loca.lt';
```

### 4. Iniciar o aplicativo

Na pasta `frontend/meuCrudApp/` em outro terminal, execute:

```bash
npx expo start --tunnel
```

Será gerado um **QR Code** no terminal. Abra o aplicativo **Expo Go** no seu celular e escaneie o código para rodar o app.

---

## 📁 Estrutura do Projeto

```
├── backend/
│   └── db.json               # Banco de dados fake do JSON Server
│
└── frontend/
    └── meuCrudApp/
        ├── App.js             # Configuração da navegação
        ├── src/
        │   ├── components/
        │   │   └── CardPersonal.js    # Card de exibição de cada contato
        │   ├── screens/
        │   │   ├── HomeScreen.js      # Tela principal com lista e busca
        │   │   └── AddEditScreen.js   # Tela de adicionar/editar contato
        │   ├── servers/
        │   │   ├── configApi.js       # URL base da API
        │   │   └── peopleCrud.js      # Funções de consumo da API (CRUD)
        │   └── styles/
        │       └── styles.js          # Estilos e tokens de design
```

---

## 📌 Considerações Finais

- O backend utilizado é apenas para fins de **desenvolvimento e estudo**.
- A URL do LocalTunnel **muda a cada reinicialização**, então lembre-se de sempre atualizar o arquivo `configApi.js`.
- Para testar localmente (sem celular), você pode usar a URL `http://localhost:3000` no `configApi.js` e rodar o app em um emulador ou no navegador com `npx expo start --web`.

---

## 👩‍💻 Autora

*Nome:* [Beatriz V. Xavier](https://github.com/Bea-Xavier)

---

## 📄 Licença

Este projeto é desenvolvido apenas para fins acadêmicos e de estudo. 🚀

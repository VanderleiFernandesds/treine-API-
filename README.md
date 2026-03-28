# Projeto E-commerce

Projeto de estudo com frontend em JavaScript e backend em Node.js + Express, consumindo dados de um banco MySQL.

Hoje o projeto ja faz:

- exibir produtos no frontend
- buscar produtos pela API
- ler os dados da tabela `products` no MySQL

## Tecnologias

- HTML
- CSS
- JavaScript
- Node.js
- Express
- MySQL
- dotenv
- cors

## Estrutura

```text
project/
  backend/
    src/
      config/
      controllers/
      routes/
      app.js
    server.js
    package.json
    .env.example
  frontend/
    css/
    images/
      banners/
      icons/
      products/
    js/
      components/
      services/
      main.js
    index.html
  README.md
```

## Como funciona

O frontend faz uma requisicao para:

```text
GET http://localhost:3001/api/products
```

Essa rota e tratada no backend, que consulta a tabela `products` no MySQL e devolve os resultados em JSON.

## Backend

No backend, a organizacao atual esta assim:

- `src/app.js`: configura o Express, `cors`, leitura de JSON e registra as rotas
- `src/routes/productRoutes.js`: define a rota `/api/products`
- `src/controllers/productController.js`: executa a consulta no banco
- `src/config/db.js`: cria a conexao com o MySQL usando variaveis de ambiente
- `server.js`: inicia o servidor na porta `3001`

Scripts disponiveis em `backend/package.json`:

```bash
npm start
npm run dev
```

## Frontend

No frontend, a organizacao atual esta assim:

- `index.html`: estrutura principal da pagina
- `images/banners/`: imagens de destaque da interface
- `images/icons/`: icones do projeto, como favicon e elementos visuais pequenos
- `images/products/`: imagens dos produtos e placeholder
- `js/main.js`: carrega os produtos quando a pagina abre
- `js/services/api.js`: faz o `fetch` para a API
- `js/components/`: componentes de renderizacao dos produtos

## Pre-requisitos

Antes de rodar o projeto, voce precisa ter instalado:

- Node.js
- MySQL

Tambem e necessario ter uma base de dados com a tabela `products`.

## Configuracao do backend

Entre na pasta do backend:

```bash
cd backend
```

Instale as dependencias:

```bash
npm install
```

Crie um arquivo `.env` com base no `.env.example`:

```env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=seu_banco
```

## Como rodar o projeto

### 1. Iniciar o backend

No terminal:

```bash
cd backend
npm start
```

Para desenvolvimento com reinicio automatico:

```bash
cd backend
npm run dev
```

Se tudo estiver certo, o servidor sobe em:

```text
http://localhost:3001
```

### 2. Abrir o frontend

Abra o arquivo `frontend/index.html` no navegador ou rode com uma extensao como Live Server no VS Code.

Com o backend ligado, o frontend deve carregar os produtos automaticamente.

## Endpoint disponivel

### `GET /api/products`

Retorna todos os produtos cadastrados na tabela `products`.

Exemplo de resposta:

```json
[
  {
    "id": 1,
    "name": "Produto exemplo",
    "price": 199.9
  }
]
```

## Banco de dados

Este projeto espera uma tabela chamada `products`.

Pelos dados usados no frontend, os campos mais provaveis sao:

- `id`
- `name`
- `description`
- `brand`
- `price`
- `image`

Se quiser, depois podemos documentar o SQL da tabela no proprio repositorio.

## Publicacao no GitHub

Antes de subir o projeto:

- mantenha o arquivo `.env` fora do Git
- confirme que `node_modules` nao sera enviado
- revise se nao existe nenhuma credencial salva em arquivos versionados

O `.gitignore` do projeto ja esta configurado para ignorar `node_modules`, `.env`, logs e arquivos locais do editor.

## Observacoes

- o backend esta usando `CommonJS` com `require`
- a API ainda esta simples e, no momento, possui rota de leitura `GET`
- o frontend depende do backend rodando na porta `3001`

## Proximos passos sugeridos

- adicionar rotas `POST`, `PUT` ou `PATCH` e `DELETE`
- validar dados antes de salvar no banco
- tratar melhor respostas de erro
- documentar a estrutura exata da tabela `products`
- adicionar testes para backend

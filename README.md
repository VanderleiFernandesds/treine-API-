# Projeto E-commerce

Projeto de estudo com frontend em JavaScript e backend em Node.js + Express, consumindo dados de um banco MySQL.

Hoje o projeto ja faz:

- exibir produtos no frontend
- buscar produtos pela API
- ler os dados da tabela `products` no MySQL
- cadastrar novos produtos
- buscar um produto por id
- atualizar produtos existentes
- remover produtos
- gerenciar produtos em uma pagina admin separada da loja

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
      admin.js
      main.js
    admin.html
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

O backend esta configurado com ES Modules, usando `import` e `export`.

Scripts disponiveis em `backend/package.json`:

```bash
npm start
npm run dev
```

## Frontend

No frontend, a organizacao atual esta assim:

- `index.html`: estrutura principal da pagina
- `admin.html`: painel administrativo separado para treinar o CRUD no frontend
- `images/banners/`: imagens de destaque da interface
- `images/icons/`: icones do projeto, como favicon e elementos visuais pequenos
- `images/products/`: imagens dos produtos e placeholder
- `js/admin.js`: carrega a lista no painel admin e controla cadastro, edicao, exclusao, feedback visual e modal
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

### 3. Abrir o painel admin

Para treinar o CRUD pelo frontend sem misturar com a vitrine, abra:

```text
frontend/admin.html
```

Nessa pagina voce pode:

- cadastrar produtos
- editar produtos existentes
- remover produtos
- alternar entre modo cadastro e modo edicao
- visualizar mensagens de sucesso e erro sem usar `alert()`
- confirmar exclusoes em um modal

## Endpoints disponiveis

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

### `GET /api/products/:id`

Retorna um unico produto com base no `id` informado na URL.

Exemplo de resposta:

```json
{
  "id": 1,
  "name": "Produto exemplo",
  "description": "Descricao do produto",
  "brand": "Marca exemplo",
  "price": 199.9,
  "image": "produto-exemplo.png"
}
```

### `POST /api/products`

Cadastra um novo produto no banco de dados.

Exemplo de corpo da requisicao:

```json
{
  "name": "Mouse Gamer",
  "description": "Mouse com RGB",
  "brand": "Logitech",
  "price": 149.9,
  "image": "mouse-gamer-rgb.png"
}
```

### `PUT /api/products/:id`

Atualiza os dados de um produto existente com base no `id`.

Exemplo de corpo da requisicao:

```json
{
  "name": "Mouse Gamer Pro",
  "description": "Mouse atualizado",
  "brand": "Logitech",
  "price": 199.9,
  "image": "mouse-gamer-rgb.png"
}
```

### `DELETE /api/products/:id`

Remove o produto correspondente ao `id` informado.

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

- o backend esta usando `ES Modules` com `import` e `export`
- a API possui CRUD basico para a entidade `products`
- o frontend depende do backend rodando na porta `3001`
- a loja publica e o painel admin foram separados em paginas diferentes
- o painel admin usa feedback visual e modal de confirmacao para exclusao

## Proximos passos sugeridos

- melhorar a validacao dos dados recebidos
- padronizar ainda mais as respostas de erro
- documentar a estrutura exata da tabela `products`
- adicionar testes para backend
- adicionar busca, filtros ou carrinho para evoluir o projeto

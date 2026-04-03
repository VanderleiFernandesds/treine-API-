# Projeto E-commerce

Projeto de estudo com frontend em JavaScript e backend em Node.js + Express, consumindo dados de um banco MySQL.

Hoje o projeto ja faz:

- autenticar usuarios com login real usando banco de dados
- cadastrar novos usuarios customer pela interface
- redirecionar cliente para a loja e admin para o painel administrativo
- exibir produtos no frontend
- adicionar produtos em um carrinho lateral na loja publica
- mostrar a sessao ativa do usuario com logout visivel na loja
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
        authController.js
      routes/
        authRoutes.js
      middlewares/
        authMiddleware.js
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
        adminProductCard.js
        productCard.js
      features/
        adminForm.js
        adminList.js
      services/
        api.js
      utils/
        adminFeedback.js
        adminModal.js
        auth.js
        cartStore.js
      login.js
      register.js
      admin.js
      main.js
    admin.html
    index.html
    login.html
    register.html
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
- `src/routes/authRoutes.js`: define as rotas `/api/auth/login` e `/api/auth/register`
- `src/controllers/productController.js`: executa o CRUD de produtos no banco
- `src/controllers/authController.js`: valida email e senha, compara hash e gera JWT
- `src/middlewares/authMiddleware.js`: valida token e restringe acoes para admin
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
- `login.html`: pagina de autenticacao antes de entrar na loja
- `register.html`: pagina de cadastro publico para novos clientes
- `admin.html`: painel administrativo separado para treinar o CRUD no frontend
- `images/banners/`: imagens de destaque da interface
- `images/icons/`: icones do projeto, como favicon e elementos visuais pequenos
- `images/products/`: imagens dos produtos e placeholder
- `js/admin.js`: inicializa e conecta os modulos da pagina admin
- `js/components/adminProductCard.js`: monta os cards do painel admin
- `js/components/productCard.js`: monta os cards da loja publica
- `js/features/adminForm.js`: controla o formulario do admin, incluindo cadastro e edicao
- `js/features/adminList.js`: controla a listagem, modal de exclusao e eventos dos cards
- `js/login.js`: envia o login para a API e redireciona conforme o papel do usuario
- `js/register.js`: envia o cadastro para a API e redireciona para o login
- `js/main.js`: carrega os produtos da loja e controla o carrinho lateral
- `js/services/api.js`: faz o `fetch` para a API
- `js/utils/adminFeedback.js`: controla as mensagens visuais do painel
- `js/utils/adminModal.js`: controla a abertura e o fechamento do modal de exclusao
- `js/utils/auth.js`: centraliza token, usuario salvo e verificacao de sessao
- `js/utils/cartStore.js`: salva e recupera os itens do carrinho usando `localStorage`

## Pre-requisitos

Antes de rodar o projeto, voce precisa ter instalado:

- Node.js
- MySQL

Tambem e necessario ter uma base de dados com a tabela `products`.
Para o login real, tambem e necessario ter a tabela `users`.

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
JWT_SECRET=sua_chave_secreta_jwt
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

Na vitrine publica voce tambem pode:

- adicionar produtos ao carrinho
- aumentar e diminuir quantidades
- remover um item especifico
- limpar o carrinho inteiro
- manter o carrinho salvo no navegador com `localStorage`
- visualizar o usuario logado e sair pela lateral da loja
- navegar em um layout ajustado para desktop, tablet e mobile

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

### 4. Fazer login

Antes de acessar a loja ou o painel admin, abra:

```text
frontend/login.html
```

Fluxo atual de acesso:

- usuarios com `role = customer` vao para a loja publica
- usuarios com `role = admin` vao para o painel admin
- usuarios sem token valido voltam para a tela de login

### 5. Fazer cadastro

Novos clientes podem criar conta em:

```text
frontend/register.html
```

Fluxo atual de cadastro:

- o formulario envia nome, email e senha para `/api/auth/register`
- o backend valida email duplicado
- a senha e salva com hash usando `bcrypt`
- novas contas entram sempre com `role = customer`
- apos o sucesso, o usuario e redirecionado para `login.html`

## Endpoints disponiveis

### `POST /api/auth/login`

Valida o usuario no banco, compara a senha com `bcrypt` e devolve um token JWT.

Exemplo de corpo da requisicao:

```json
{
  "email": "admin@loja.com",
  "password": "123456"
}
```

### `POST /api/auth/register`

Cria um novo usuario customer no banco com senha protegida por hash.

Exemplo de corpo da requisicao:

```json
{
  "name": "Joao Teste",
  "email": "joao@loja.com",
  "password": "123456"
}
```

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

Para autenticacao real, o projeto tambem usa uma tabela `users`.

Campos recomendados:

- `id`
- `name`
- `email`
- `password_hash`
- `role`
- `created_at`

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
- a loja publica possui um carrinho lateral com persistencia local no navegador
- a loja publica mostra a sessao ativa e um botao de logout na sidebar
- o login usa JWT, `bcrypt` e controle de acesso por `role`
- o cadastro publico cria apenas usuarios com `role = customer`
- somente usuarios com `role = admin` podem acessar o painel admin e alterar produtos

## Proximos passos sugeridos

- melhorar a validacao dos dados recebidos
- padronizar ainda mais as respostas de erro
- documentar a estrutura exata da tabela `products`
- adicionar testes para backend
- adicionar busca e filtros na loja
- evoluir o carrinho para finalizar pedido
- permitir edicao de perfil ou historico do usuario

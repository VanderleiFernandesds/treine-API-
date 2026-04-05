import { getJsonAuthHeaders } from "./httpHeaders.js";

const PRODUCTS_API_URL = "http://localhost:3001/api/products";

// Busca a lista publica de produtos usada na loja e no admin.
export async function getProdutos() {
  const response = await fetch(PRODUCTS_API_URL);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}

// Cria um produto novo no backend usando o token do admin.
export async function criarProduto(produto) {
  const response = await fetch(PRODUCTS_API_URL, {
    method: "POST",
    headers: getJsonAuthHeaders(),
    body: JSON.stringify(produto),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? `HTTP ${response.status}`);
  }

  return data;
}

// Remove um produto existente pelo id.
export async function deletarProduto(id) {
  const response = await fetch(`${PRODUCTS_API_URL}/${id}`, {
    method: "DELETE",
    headers: getJsonAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? `HTTP ${response.status}`);
  }

  return data;
}

// Atualiza os dados do produto em modo de edicao.
export async function atualizarProduto(id, produto) {
  const response = await fetch(`${PRODUCTS_API_URL}/${id}`, {
    method: "PUT",
    headers: getJsonAuthHeaders(),
    body: JSON.stringify(produto),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? `HTTP ${response.status}`);
  }

  return data;
}

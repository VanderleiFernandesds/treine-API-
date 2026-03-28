
import { getProdutos } from './services/api.js';
import { criarProdutoHTML } from './components/productCard.js';

async function carregarProdutos() {
  const lista = document.getElementById("store-loja");

  try {
    const produtos = await getProdutos();

    lista.innerHTML = "";

    produtos.forEach(produto => {
      const item = criarProdutoHTML(produto);
      lista.appendChild(item);
    });

  } catch (error) {
    console.error(error);
    lista.innerHTML = '<p class="feedback">Erro ao carregar</p>';
  }
}

document.addEventListener("DOMContentLoaded", carregarProdutos);

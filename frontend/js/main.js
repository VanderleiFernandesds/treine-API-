import { criarProdutoHTML } from "./components/productCard.js";
import { getProdutos } from "./services/api.js";
import {
  clearAuthSession,
  getStoredUser,
  hasActiveSession,
} from "./utils/auth.js";
import {
  addToCart,
  clearCart,
  decreaseCartItem,
  getCart,
  increaseCartItem,
  removeFromCart,
} from "./utils/cartStore.js";

function verificarAutenticacao() {
  if (!hasActiveSession()) {
    clearAuthSession();
    window.location.href = "./login.html";
  }
}

function mostrarUsuarioLogado() {
  const userElement = document.getElementById("logged-user");
  const user = getStoredUser();

  if (!userElement || !user) return;

  userElement.textContent = `Usuario: ${user.name}`;
}


// Formata valores monetários no padrão brasileiro.
function formatCurrency(value) {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

// Reaproveita a mesma normalização usada nas imagens dos produtos.
function normalizarNomeImagem(imageName) {
  if (!imageName) {
    return "placeholder.png";
  }

  return imageName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-");
}

// Atualiza visualmente o carrinho lateral com itens, quantidades e total.
function renderCart() {
  const cart = getCart();
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  cartCount.textContent = `${totalItems} ${totalItems === 1 ? "item" : "itens"}`;
  cartTotal.textContent = `Total: ${formatCurrency(totalPrice)}`;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="cart-empty">Seu carrinho está vazio.</p>';
    return;
  }

  cartItems.innerHTML = "";

  cart.forEach((item) => {
    const cartItem = document.createElement("article");
    cartItem.className = "cart-item";
    const imageName = normalizarNomeImagem(item.image);

    cartItem.innerHTML = `
      <div class="cart-item-top">
        <div class="cart-item-summary">
          <img
            class="cart-item-image"
            src="./images/products/${imageName}"
            alt="${item.name}"
          >
          <div class="cart-item-info">
            <strong>${item.name}</strong>
            <span>Subtotal: ${formatCurrency(item.price * item.quantity)}</span>
          </div>
        </div>
      </div>

      <div class="cart-item-bottom">
        <span class="cart-unit-price">${formatCurrency(item.price)} cada</span>
        <div class="cart-item-actions">
          <button class="cart-remove-button" type="button" aria-label="Remover ${item.name}">
            Remover
          </button>
          <div class="cart-quantity-controls">
            <button class="cart-quantity-button" type="button" aria-label="Diminuir ${item.name}">
              -
            </button>
            <span class="cart-quantity-value">${item.quantity}</span>
            <button class="cart-quantity-button" type="button" aria-label="Aumentar ${item.name}">
              +
            </button>
          </div>
        </div>
      </div>
    `;

    const removeButton = cartItem.querySelector(".cart-remove-button");
    const quantityButtons = cartItem.querySelectorAll(".cart-quantity-button");

    // Remove o item inteiro do carrinho.
    removeButton.addEventListener("click", () => {
      removeFromCart(item.id);
      renderCart();
    });

    // Diminui a quantidade do item, removendo quando chegar a zero.
    quantityButtons[0].addEventListener("click", () => {
      decreaseCartItem(item.id);
      renderCart();
    });

    // Aumenta a quantidade do item no carrinho.
    quantityButtons[1].addEventListener("click", () => {
      increaseCartItem(item.id);
      renderCart();
    });

    cartItems.appendChild(cartItem);
  });
}

// Busca os produtos da API e monta a vitrine da loja.
async function carregarProdutos() {
  const lista = document.getElementById("store-loja");

  try {
    const produtos = await getProdutos();

    lista.innerHTML = "";

    produtos.forEach((produto) => {
      const item = criarProdutoHTML(produto);
      lista.appendChild(item);
    });
  } catch (error) {
    console.error(error);
    lista.innerHTML = '<p class="feedback">Erro ao carregar</p>';
  }
}

// Conecta os eventos da vitrine e inicializa o estado salvo do carrinho.
document.addEventListener("DOMContentLoaded", () => {
  verificarAutenticacao();
  mostrarUsuarioLogado();

  const productList = document.getElementById("store-loja");
  const clearButton = document.getElementById("cart-clear-button");
  const logoutButton = document.getElementById("logout-button");

  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      clearAuthSession();
      window.location.href = "./login.html";
    });
  }


  if (productList) {
    // Escuta o evento customizado disparado pelos cards ao adicionar um item.
    productList.addEventListener("add-to-cart", (event) => {
      addToCart(event.detail);
      renderCart();
    });
  }

  if (clearButton) {
    // Limpa completamente o carrinho salvo no navegador.
    clearButton.addEventListener("click", () => {
      clearCart();
      renderCart();
    });
  }

  carregarProdutos();
  renderCart();
});

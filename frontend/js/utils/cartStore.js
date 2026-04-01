const CART_STORAGE_KEY = "store-cart";

// Lê o carrinho salvo no localStorage e garante retorno em formato de array.
function readCart() {
  const rawCart = localStorage.getItem(CART_STORAGE_KEY);

  if (!rawCart) {
    return [];
  }

  try {
    const parsedCart = JSON.parse(rawCart);
    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch {
    return [];
  }
}

// Persiste o carrinho atualizado no navegador.
function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

// Retorna o estado atual do carrinho salvo.
export function getCart() {
  return readCart();
}

// Adiciona um produto ao carrinho ou soma quantidade se ele já existir.
export function addToCart(product) {
  const cart = readCart();
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.image,
      quantity: 1,
    });
  }

  saveCart(cart);
  return cart;
}

// Remove uma unidade do item e exclui do carrinho ao chegar em zero.
export function removeFromCart(productId) {
  const cart = readCart()
    .map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
    )
    .filter((item) => item.quantity > 0);

  saveCart(cart);
  return cart;
}

// Aumenta a quantidade de um item já existente no carrinho.
export function increaseCartItem(productId) {
  const cart = readCart().map((item) =>
    item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
  );

  saveCart(cart);
  return cart;
}

// Diminui a quantidade de um item do carrinho.
export function decreaseCartItem(productId) {
  const cart = readCart()
    .map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
    )
    .filter((item) => item.quantity > 0);

  saveCart(cart);
  return cart;
}

// Esvazia completamente o carrinho salvo.
export function clearCart() {
  saveCart([]);
  return [];
}

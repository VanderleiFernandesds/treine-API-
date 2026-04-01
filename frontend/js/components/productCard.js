function normalizarNomeImagem(imageName) {
  if (!imageName) {
    return "placeholder.png";
  }

  const normalizedName = imageName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-");

  return normalizedName;
}

export function criarProdutoHTML(produto) {
  const item = document.createElement("article");
  item.className = "product-card";
  const imageName = normalizarNomeImagem(produto.image);

  item.innerHTML = `
    <img class="product-image"
      src="./images/products/${imageName}"
      alt="${produto.name}">
      
    <h2>${produto.name}</h2>
    <p>${produto.description ?? "Sem descricao."}</p>
    <span class="product-brand">
      ${produto.brand ?? "Marca nao informada"}
    </span>
    <strong>R$ ${Number(produto.price).toFixed(2)}</strong>
    <button class="product-card-button" type="button">
      Adicionar ao carrinho
    </button>
  `;

  const addButton = item.querySelector(".product-card-button");
  addButton.addEventListener("click", () => {
    item.dispatchEvent(
      new CustomEvent("add-to-cart", {
        bubbles: true,
        detail: produto,
      }),
    );
  });

  return item;
}

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

function getProductImageSrc(imageName) {
  if (!imageName) {
    return "./images/products/placeholder.png";
  }

  if (imageName.startsWith("http://") || imageName.startsWith("https://")) {
    return imageName;
  }

  if (imageName.startsWith("/uploads/")) {
    return `http://localhost:3001${imageName}`;
  }

  const normalizedName = normalizarNomeImagem(imageName);
  return `./images/products/${normalizedName}`;
}

export function criarProdutoHTML(produto) {
  const item = document.createElement("article");
  item.className = "product-card";
  const imageSrc = getProductImageSrc(produto.image);

  item.innerHTML = `
    <img class="product-image"
      src="${imageSrc}"
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

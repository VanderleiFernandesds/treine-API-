export function criarAdminProductCard(produto) {
  const item = document.createElement("div");
  item.className = "admin-product-card";

  item.innerHTML = `
    <h3>${produto.name}</h3>
    <p>${produto.description ?? "Sem descricao"}</p>
    <div class="admin-product-meta">
      <span class="admin-product-brand">${produto.brand ?? "Sem marca"}</span>
      <strong class="admin-product-price">R$ ${Number(produto.price).toFixed(2)}</strong>
    </div>
    <div class="admin-card-actions">
      <button class="admin-card-button edit-button" data-id="${produto.id}">Editar</button>
      <button class="admin-card-button delete-button" data-id="${produto.id}">Excluir</button>
    </div>
  `;

  return item;
}

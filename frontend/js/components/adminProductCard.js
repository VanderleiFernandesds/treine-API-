export function criarAdminProductCard(produto) {
  // Cada produto do admin e representado por uma linha da tabela.
  const item = document.createElement("tr");
  item.className = "admin-product-row";

  item.innerHTML = `
    <td class="admin-cell-strong">${produto.name}</td>
    <td>${produto.description ?? "Sem descricao"}</td>
    <td>${produto.brand ?? "Sem marca"}</td>
    <td>R$ ${Number(produto.price).toFixed(2)}</td>
    <td><span class="admin-status-badge">Ativo</span></td>
    <td>
      <div class="admin-table-actions">
        <button class="admin-table-link edit-button" data-id="${produto.id}">Editar</button>
        <span>|</span>
        <!-- Acoes ficam compactas para aproximar o visual de um painel tipo CMS. -->
        <button class="admin-table-link delete-button" data-id="${produto.id}">Excluir</button>
      </div>
    </td>
  `;

  return item;
}

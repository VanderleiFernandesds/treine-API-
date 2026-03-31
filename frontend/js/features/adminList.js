import { deletarProduto, getProdutos } from "../services/api.js";
import { criarAdminProductCard } from "../components/adminProductCard.js";
import { mostrarFeedback } from "../utils/adminFeedback.js";
import { abrirModalExclusao, fecharModalExclusao } from "../utils/adminModal.js";

export function createAdminListController({ onEdit }) {
  let produtoParaExcluir = null;

  function fecharModalEReiniciarExclusao() {
    fecharModalExclusao();
    produtoParaExcluir = null;
  }

  async function confirmarExclusao() {
    if (!produtoParaExcluir) return;

    try {
      await deletarProduto(produtoParaExcluir.id);
      await loadProducts();
      mostrarFeedback("Produto excluido com sucesso.");
    } catch (error) {
      console.error(error);
      mostrarFeedback("Erro ao excluir produto.", "erro");
    }

    fecharModalEReiniciarExclusao();
  }

  async function loadProducts() {
    const lista = document.getElementById("admin-product-list");

    try {
      const produtos = await getProdutos();

      lista.innerHTML = "";

      if (produtos.length === 0) {
        lista.innerHTML = `
          <div class="admin-empty-state">
            <p>Nenhum produto cadastrado ainda.</p>
          </div>
        `;
        return;
      }

      produtos.forEach((produto) => {
        const item = criarAdminProductCard(produto);

        lista.appendChild(item);

        const botaoEditar = item.querySelector(".edit-button");
        const botaoExcluir = item.querySelector(".delete-button");

        botaoEditar.addEventListener("click", () => {
          onEdit(produto);
        });

        botaoExcluir.addEventListener("click", () => {
          produtoParaExcluir = produto;
          abrirModalExclusao(produto);
        });
      });
    } catch (error) {
      console.error(error);
      lista.innerHTML =
        '<p class="admin-empty-state">Erro ao carregar produtos.</p>';
    }
  }

  function init() {
    const confirmDeleteButton = document.getElementById("confirm-delete-button");
    const cancelDeleteButton = document.getElementById("cancel-delete-button");
    const deleteModal = document.getElementById("delete-modal");

    if (confirmDeleteButton) {
      confirmDeleteButton.addEventListener("click", confirmarExclusao);
    }

    if (cancelDeleteButton) {
      cancelDeleteButton.addEventListener("click", fecharModalEReiniciarExclusao);
    }

    if (deleteModal) {
      deleteModal.addEventListener("click", (event) => {
        if (event.target === deleteModal) {
          fecharModalEReiniciarExclusao();
        }
      });
    }

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        fecharModalEReiniciarExclusao();
      }
    });
  }

  return {
    init,
    loadProducts,
  };
}

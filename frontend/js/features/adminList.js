import { deletarProduto, getProdutos } from "../services/api.js";
import { criarAdminProductCard } from "../components/adminProductCard.js";
import { mostrarFeedback } from "../utils/adminFeedback.js";
import { abrirModalExclusao, fecharModalExclusao } from "../utils/adminModal.js";

export function createAdminListController({ onEdit }) {
  let produtoParaExcluir = null;

  // Sempre que o modal fecha, limpamos a referencia do item pendente de exclusao.
  function fecharModalEReiniciarExclusao() {
    fecharModalExclusao();
    produtoParaExcluir = null;
  }

  // Confirma a exclusao, atualiza a tabela e reutiliza o mesmo feedback do painel.
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

  // Carrega a listagem principal e trata estado vazio/erro dentro do tbody da tabela.
  async function loadProducts() {
    const lista = document.getElementById("admin-product-list");

    try {
      const produtos = await getProdutos();

      lista.innerHTML = "";

      if (produtos.length === 0) {
        lista.innerHTML = `
          <tr class="admin-empty-row">
            <td colspan="6">
              <div class="admin-empty-state">
                <p>Nenhum produto cadastrado ainda.</p>
              </div>
            </td>
          </tr>
        `;
        return;
      }

      produtos.forEach((produto) => {
        const item = criarAdminProductCard(produto);

        lista.appendChild(item);

        const botaoEditar = item.querySelector(".edit-button");
        const botaoExcluir = item.querySelector(".delete-button");

        // A edicao reaproveita o modal do formulario com os dados preenchidos.
        botaoEditar.addEventListener("click", () => {
          onEdit(produto);
        });

        // Antes de excluir, a linha selecionada e armazenada para confirmacao posterior.
        botaoExcluir.addEventListener("click", () => {
          produtoParaExcluir = produto;
          abrirModalExclusao(produto);
        });
      });
    } catch (error) {
      console.error(error);
      lista.innerHTML =
        `
          <tr class="admin-empty-row">
            <td colspan="6">
              <div class="admin-empty-state">
                <p>Erro ao carregar produtos.</p>
              </div>
            </td>
          </tr>
        `;
    }
  }

  // Liga os eventos de confirmacao do modal e os atalhos de fechamento.
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

import {
  atualizarProduto,
  criarProduto,
  deletarProduto,
  getProdutos,
} from "./services/api.js";

// Alterna o formulário entre modo cadastro e modo edição.
function atualizarModoFormulario(modo) {
  const formMode = document.getElementById("form-mode");
  const submitButton = document.getElementById("submit-button");

  if (modo === "edicao") {
    formMode.textContent = "Modo edicao";
    submitButton.textContent = "Salvar edicao";
  } else {
    formMode.textContent = "Modo cadastro";
    submitButton.textContent = "Cadastrar";
  }
}

// Busca os produtos da API e renderiza os cards no painel administrativo.
async function carregarProdutosAdmin() {
  const lista = document.getElementById("admin-product-list");

  try {
    const produtos = await getProdutos();

    lista.innerHTML = "";

    // Exibe um estado vazio quando ainda não existem produtos cadastrados.
    if (produtos.length === 0) {
      lista.innerHTML = `
        <div class="admin-empty-state">
          <p>Nenhum produto cadastrado ainda.</p>
        </div>
      `;
      return;
    }

    produtos.forEach((produto) => {
      const item = document.createElement("div");
      item.className = "admin-product-card";

      // Monta o card com os dados do produto e os botões de ação.
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

      lista.appendChild(item);

      const botaoEditar = item.querySelector(".edit-button");
      const botaoExcluir = item.querySelector(".delete-button");

      // Preenche o formulário com os dados atuais para editar o produto.
      botaoEditar.addEventListener("click", () => {
        const form = document.getElementById("product-form");

        form.elements.id.value = produto.id;
        form.elements.name.value = produto.name ?? "";
        form.elements.description.value = produto.description ?? "";
        form.elements.brand.value = produto.brand ?? "";
        form.elements.price.value = produto.price ?? "";
        form.elements.image.value = produto.image ?? "";
        atualizarModoFormulario("edicao");
        form.scrollIntoView({ behavior: "smooth", block: "start" });
      });

      // Remove o produto da base e recarrega a lista ao confirmar a exclusão.
      botaoExcluir.addEventListener("click", async () => {
        const confirmar = confirm(
          `Deseja excluir o produto "${produto.name}"?`,
        );

        if (!confirmar) return;

        try {
          await deletarProduto(produto.id);
          await carregarProdutosAdmin();
          alert("Produto excluido com sucesso.");
        } catch (error) {
          console.error(error);
          alert("Erro ao excluir produto.");
        }
      });
    });
  } catch (error) {
    console.error(error);
    lista.innerHTML = '<p class="admin-empty-state">Erro ao carregar produtos.</p>';
  }
}

// Envia o formulário para criar um novo produto ou atualizar um existente.
async function cadastrarProduto(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);
  const id = formData.get("id");

  const produto = {
    name: formData.get("name")?.trim(),
    description: formData.get("description")?.trim(),
    brand: formData.get("brand")?.trim(),
    price: formData.get("price"),
    image: formData.get("image")?.trim(),
  };

  try {
    // Se existir id, atualiza; caso contrário, cria um novo produto.
    if (id) {
      await atualizarProduto(id, produto);
      alert("Produto atualizado com sucesso.");
    } else {
      await criarProduto(produto);
      alert("Produto cadastrado com sucesso.");
    }

    form.reset();
    await carregarProdutosAdmin();
    atualizarModoFormulario("cadastro");
  } catch (error) {
    console.error(error);
    alert("Erro ao salvar produto.");
  }
}

// Limpa o formulário e encerra o modo de edição.
function cancelarEdicao() {
  const form = document.getElementById("product-form");

  form.reset();
  form.elements.id.value = "";
  atualizarModoFormulario("cadastro");
}

// Conecta os eventos da interface quando a página administrativa termina de carregar.
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("product-form");
  const cancelButton = document.getElementById("cancel-edit-button");

  if (form) {
    form.addEventListener("submit", cadastrarProduto);
  }

  if (cancelButton) {
    cancelButton.addEventListener("click", cancelarEdicao);
  }

  carregarProdutosAdmin();
  atualizarModoFormulario("cadastro");
});

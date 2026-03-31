import { atualizarProduto, criarProduto } from "../services/api.js";
import { mostrarFeedback } from "../utils/adminFeedback.js";

export function createAdminFormController({ onSaved }) {
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

  function startEdit(produto) {
    const form = document.getElementById("product-form");

    form.elements.id.value = produto.id;
    form.elements.name.value = produto.name ?? "";
    form.elements.description.value = produto.description ?? "";
    form.elements.brand.value = produto.brand ?? "";
    form.elements.price.value = produto.price ?? "";
    form.elements.image.value = produto.image ?? "";
    atualizarModoFormulario("edicao");
    form.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function cancelarEdicao() {
    const form = document.getElementById("product-form");

    form.reset();
    form.elements.id.value = "";
    atualizarModoFormulario("cadastro");
    mostrarFeedback("");
  }

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
      if (id) {
        await atualizarProduto(id, produto);
        mostrarFeedback("Produto atualizado com sucesso.");
      } else {
        await criarProduto(produto);
        mostrarFeedback("Produto cadastrado com sucesso.");
      }

      form.reset();
      atualizarModoFormulario("cadastro");
      await onSaved();
    } catch (error) {
      console.error(error);
      mostrarFeedback("Erro ao salvar produto.", "erro");
    }
  }

  function init() {
    const form = document.getElementById("product-form");
    const cancelButton = document.getElementById("cancel-edit-button");

    if (form) {
      form.addEventListener("submit", cadastrarProduto);
    }

    if (cancelButton) {
      cancelButton.addEventListener("click", cancelarEdicao);
    }

    atualizarModoFormulario("cadastro");
  }

  return {
    init,
    startEdit,
  };
}

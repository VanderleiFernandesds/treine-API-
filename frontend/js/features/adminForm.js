import {
  atualizarProduto,
  criarProduto,
  uploadImagemProduto,
} from "../services/api.js";
import { mostrarFeedback } from "../utils/adminFeedback.js";

export function createAdminFormController({ onSaved }) {
  // Modal que encapsula o formulario de cadastro e edicao.
  function getFormModal() {
    return document.getElementById("admin-form-modal");
  }

  // Abre o overlay do formulario quando o usuario cria ou edita um produto.
  function openFormPanel() {
    const panel = getFormModal();

    if (!panel) return;

    panel.classList.remove("hidden");
  }

  // Fecha o formulario e devolve o foco para a listagem principal.
  function closeFormPanel() {
    const panel = getFormModal();

    if (!panel) return;

    panel.classList.add("hidden");
  }

  // Ajusta o texto do formulario para refletir se estamos cadastrando ou editando.
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

  // Preenche o formulario com os dados existentes e abre o modal em modo edicao.
  function startEdit(produto) {
    const form = document.getElementById("product-form");

    openFormPanel();
    form.elements.id.value = produto.id;
    form.elements.name.value = produto.name ?? "";
    form.elements.description.value = produto.description ?? "";
    form.elements.brand.value = produto.brand ?? "";
    form.elements.price.value = produto.price ?? "";
    form.elements.image.value = produto.image ?? "";
    form.elements.imageFile.value = "";
    atualizarModoFormulario("edicao");
  }

  // Limpa o estado interno do formulario e fecha o modal.
  function cancelarEdicao() {
    const form = document.getElementById("product-form");

    form.reset();
    form.elements.id.value = "";
    atualizarModoFormulario("cadastro");
    mostrarFeedback("");

    const uploadFileName = document.getElementById("upload-file-name");

    if (uploadFileName) {
      uploadFileName.textContent = "Nenhum arquivo selecionado";
    }

    closeFormPanel();
  }

  // Usa o mesmo formulario para criar e atualizar produtos conforme a presenca do id.
  async function cadastrarProduto(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const id = formData.get("id");
    const imageFile = formData.get("imageFile");
    let imagePath = formData.get("image")?.trim();

    // Se houver arquivo novo, o upload acontece antes de salvar os dados do produto.
    if (imageFile instanceof File && imageFile.size > 0) {
      mostrarFeedback("Enviando imagem...", "sucesso");
      const uploadData = await uploadImagemProduto(imageFile);
      imagePath = uploadData.path;
    }

    const produto = {
      name: formData.get("name")?.trim(),
      description: formData.get("description")?.trim(),
      brand: formData.get("brand")?.trim(),
      price: formData.get("price"),
      image: imagePath,
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
      // Depois de salvar, a tabela volta a ser o foco principal do painel.
      closeFormPanel();
    } catch (error) {
      console.error(error);
      mostrarFeedback("Erro ao salvar produto.", "erro");
    }
  }

  // Conecta os eventos do formulario, do botao novo produto e dos atalhos do modal.
  function init() {
    const form = document.getElementById("product-form");
    const cancelButton = document.getElementById("cancel-edit-button");
    const openFormButton = document.getElementById("open-form-button");
    const closeFormIconButton = document.getElementById(
      "close-form-icon-button",
    );
    const formModal = getFormModal();
    const imageInput = document.getElementById("image-file-input");
    const uploadFileName = document.getElementById("upload-file-name");
    const uploadDropzone = document.getElementById("admin-upload-dropzone");

    if (uploadDropzone) {
      // Permite o drop e realca a area enquanto o arquivo esta sobre ela.
      uploadDropzone.addEventListener("dragover", (event) => {
        event.preventDefault();
        uploadDropzone.classList.add("is-dragover");
      });

      // Ao soltar, o arquivo passa a preencher o mesmo input usado no upload normal.
      uploadDropzone.addEventListener("drop", (event) => {
        event.preventDefault();
        uploadDropzone.classList.remove("is-dragover");

        const droppedFile = event.dataTransfer?.files?.[0];

        if (!droppedFile || !imageInput) return;

        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(droppedFile);
        imageInput.files = dataTransfer.files;

        if (uploadFileName) {
          uploadFileName.textContent = droppedFile.name;
        }
      });

      // Remove o destaque quando o usuario sai da area sem soltar o arquivo.
      uploadDropzone.addEventListener("dragleave", () => {
        uploadDropzone.classList.remove("is-dragover");
      });
    }

    // Clique tradicional e drag and drop atualizam o mesmo texto com o nome do arquivo.
    if (imageInput && uploadFileName) {
      imageInput.addEventListener("change", () => {
        const selectedFile = imageInput.files?.[0];

        uploadFileName.textContent = selectedFile
          ? selectedFile.name
          : "Nenhum arquivo selecionado";
      });
    }

    if (form) {
      form.addEventListener("submit", cadastrarProduto);
    }

    if (cancelButton) {
      cancelButton.addEventListener("click", cancelarEdicao);
    }

    if (closeFormIconButton) {
      closeFormIconButton.addEventListener("click", cancelarEdicao);
    }

    if (openFormButton) {
      openFormButton.addEventListener("click", () => {
        const currentForm = document.getElementById("product-form");

        currentForm.reset();
        currentForm.elements.id.value = "";
        mostrarFeedback("");
        atualizarModoFormulario("cadastro");

        if (uploadFileName) {
          uploadFileName.textContent = "Nenhum arquivo selecionado";
        }

        openFormPanel();
      });
    }

    // Clique fora do card fecha o modal sem precisar usar o botao interno.
    if (formModal) {
      formModal.addEventListener("click", (event) => {
        if (event.target === formModal) {
          cancelarEdicao();
        }
      });
    }

    // Esc oferece um atalho rapido para sair do formulario.
    document.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        formModal &&
        !formModal.classList.contains("hidden")
      ) {
        cancelarEdicao();
      }
    });

    atualizarModoFormulario("cadastro");
    closeFormPanel();
  }

  return {
    init,
    startEdit,
  };
}

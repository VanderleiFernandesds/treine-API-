function setUploadFileName(uploadFileName, file) {
  if (!uploadFileName) return;

  uploadFileName.textContent = file ? file.name : "Nenhum arquivo selecionado";
}

// Reseta a interface do upload quando o formulario fecha ou volta para cadastro.
export function resetAdminUpload({ uploadFileName, imageInput }) {
  if (imageInput) {
    imageInput.value = "";
  }

  setUploadFileName(uploadFileName, null);
}

// Centraliza o comportamento visual e funcional da dropzone do admin.
export function bindAdminUpload({
  imageInput,
  uploadFileName,
  uploadDropzone,
}) {
  if (uploadDropzone && imageInput) {
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

      if (!droppedFile) return;

      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(droppedFile);
      imageInput.files = dataTransfer.files;
      setUploadFileName(uploadFileName, droppedFile);
    });

    // Remove o destaque quando o usuario sai da area sem soltar o arquivo.
    uploadDropzone.addEventListener("dragleave", () => {
      uploadDropzone.classList.remove("is-dragover");
    });
  }

  if (imageInput) {
    // Clique tradicional e drag and drop atualizam o mesmo texto com o nome do arquivo.
    imageInput.addEventListener("change", () => {
      setUploadFileName(uploadFileName, imageInput.files?.[0]);
    });
  }

  return {
    // Exposto para o controller principal do formulario reaproveitar o reset.
    reset() {
      resetAdminUpload({ uploadFileName, imageInput });
    },
  };
}

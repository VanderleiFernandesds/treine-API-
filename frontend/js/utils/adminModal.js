export function abrirModalExclusao(produto) {
  const modal = document.getElementById("delete-modal");
  const modalText = document.getElementById("delete-modal-text");

  modalText.textContent = `Tem certeza que deseja excluir o produto "${produto.name}"?`;
  modal.classList.remove("hidden");
}

export function fecharModalExclusao() {
  const modal = document.getElementById("delete-modal");
  modal.classList.add("hidden");
}

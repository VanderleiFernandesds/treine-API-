export function mostrarFeedback(mensagem, tipo = "sucesso") {
  const feedback = document.getElementById("admin-feedback");

  if (!mensagem) {
    feedback.textContent = "";
    feedback.className = "admin-feedback";
    return;
  }

  feedback.textContent = mensagem;
  feedback.className = `admin-feedback ${tipo}`;
}

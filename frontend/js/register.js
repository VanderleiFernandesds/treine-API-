import { clearAuthSession, hasActiveSession } from "./utils/auth.js";

const form = document.getElementById("register-form");
const feedback = document.getElementById("register-feedback");

// Envia os dados do formulario para criar um novo usuario do tipo customer.
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const name = formData.get("name")?.trim();
  const email = formData.get("email")?.trim();
  const password = formData.get("password")?.trim();
  const confirmPassword = formData.get("confirmPassword")?.trim();

  feedback.textContent = "";

  if (password !== confirmPassword) {
    feedback.textContent = "As senhas nao coincidem.";
    return;
  }

  try {
    const response = await fetch("http://localhost:3001/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error ?? "Erro ao cadastrar usuario.");
    }

    feedback.textContent = "Cadastro realizado com sucesso.";

    form.reset();

    setTimeout(() => {
      window.location.href = "./login.html";
    }, 1200);
  } catch (error) {
    feedback.textContent = error.message;
  }
});

// Evita mostrar o cadastro para quem ja possui uma sessao valida.
function verificarSessaoExistente() {
  if (hasActiveSession()) {
    window.location.href = "./index.html";
    return;
  }

  clearAuthSession();
}

verificarSessaoExistente();


import {
  clearAuthSession,
  hasActiveSession,
} from "./utils/auth.js";

const form = document.getElementById("login-form");
const feedback = document.getElementById("login-feedback");

// Evita mostrar a tela de login para quem ainda tem sessao valida.
function verificarLoginExistente() {
  if (hasActiveSession()) {
    window.location.href = "./index.html";
    return;
  }

  clearAuthSession();
}

verificarLoginExistente();

// Envia email e senha para a API, salva a sessao local e redireciona conforme o papel.
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const email = formData.get("email")?.trim();
  const password = formData.get("password")?.trim();

  feedback.textContent = "";

  try {
    const response = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error ?? "Erro ao fazer login.");
    }

    localStorage.setItem("auth_token", data.token);
    localStorage.setItem("auth_user", JSON.stringify(data.user));

    feedback.textContent = "Login realizado com sucesso.";

    if (data.user.role === "admin") {
      window.location.href = "./admin.html";
      return;
    }

    window.location.href = "./index.html";
  } catch (error) {
    feedback.textContent = error.message;
  }
});


import {
  clearAuthSession,
  hasActiveSession,
} from "./utils/auth.js";

const form = document.getElementById("login-form");
const feedback = document.getElementById("login-feedback");

// Captura o retorno do Google na URL, salva a sessao local e segue o fluxo normal do sistema.
function processarRetornoGoogle() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const user = params.get("user");

  if (!token || !user) {
    return false;
  }

  localStorage.setItem("auth_token", token);
  localStorage.setItem("auth_user", decodeURIComponent(user));

  const parsedUser = JSON.parse(decodeURIComponent(user));

  if (parsedUser.role === "admin") {
    window.location.href = "./admin.html";
  } else {
    window.location.href = "./index.html";
  }

  return true;
}


// Se nao houver retorno do Google, segue a validacao comum da tela de login.
if (!processarRetornoGoogle()) {
  verificarLoginExistente();
}


// Evita mostrar a tela de login para quem ainda tem sessao valida.
function verificarLoginExistente() {
  if (hasActiveSession()) {
    window.location.href = "./index.html";
    return;
  }

  clearAuthSession();
}



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

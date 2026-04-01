import { createAdminFormController } from "./features/adminForm.js";
import { createAdminListController } from "./features/adminList.js";
import {
  clearAuthSession,
  getStoredUser,
  hasActiveSession,
} from "./utils/auth.js";

function verificarAutenticacao() {
  if (!hasActiveSession()) {
    clearAuthSession();
    window.location.href = "./login.html";
    return;
  }

  const user = getStoredUser();

  if (!user) {
    clearAuthSession();
    window.location.href = "./login.html";
    return;
  }

  if (user.role !== "admin") {
    window.location.href = "./index.html";
  }
}

// Inicializa a página admin conectando formulário, lista e modal.
document.addEventListener("DOMContentLoaded", async () => {
    verificarAutenticacao();
  const listController = createAdminListController({
    onEdit: (produto) => {
      formController.startEdit(produto);
    },
  });

  const formController = createAdminFormController({
    onSaved: async () => {
      await listController.loadProducts();
    },
  });

  formController.init();
  listController.init();
  await listController.loadProducts();
});

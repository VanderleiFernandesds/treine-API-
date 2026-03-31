import { createAdminFormController } from "./features/adminForm.js";
import { createAdminListController } from "./features/adminList.js";

// Inicializa a página admin conectando formulário, lista e modal.
document.addEventListener("DOMContentLoaded", async () => {
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

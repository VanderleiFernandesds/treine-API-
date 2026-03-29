const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Lista todos os produtos cadastrados.
router.get("/products", productController.getProducts);

// Cadastra um novo produto no banco.
router.post("/products", productController.createProduct);

// Busca um produto especifico pelo id.
router.get("/products/:id", productController.getProductById);

// Atualiza um produto existente pelo id.
router.put("/products/:id", productController.updateProduct);

// Remove um produto do banco pelo id.
router.delete("/products/:id", productController.deleteProduct);

module.exports = router;

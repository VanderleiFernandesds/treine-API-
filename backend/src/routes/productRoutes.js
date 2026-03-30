import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct
} from "../controllers/productController.js";

const router = express.Router();

// Lista todos os produtos cadastrados.
router.get("/products", getProducts);

// Cadastra um novo produto no banco.
router.post("/products", createProduct);

// Busca um produto especifico pelo id.
router.get("/products/:id", getProductById);

// Atualiza um produto existente pelo id.
router.put("/products/:id", updateProduct);

// Remove um produto do banco pelo id.
router.delete("/products/:id", deleteProduct);

export default router;

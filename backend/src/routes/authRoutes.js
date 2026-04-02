import express from "express";
import { login, register } from "../controllers/authController.js";

const router = express.Router();

// Autenticacao de usuarios ja cadastrados.
router.post("/login", login);
// Cadastro publico de novos usuarios do tipo customer.
router.post("/register", register);

export default router;

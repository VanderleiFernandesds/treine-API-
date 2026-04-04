import express from "express";
import { login, register } from "../controllers/authController.js";
import passport from "../config/passport.js";
import jwt from "jsonwebtoken";

const router = express.Router();
const FRONTEND_LOGIN_URL = "http://127.0.0.1:49474/project/frontend/login.html";

// Autenticacao de usuarios ja cadastrados.
router.post("/login", login);
// Cadastro publico de novos usuarios do tipo customer.
router.post("/register", register);

router.get(
  "/google",
  // Inicia o fluxo OAuth no Google pedindo perfil e email.
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: FRONTEND_LOGIN_URL,
  }),
  (req, res) => {
    // Depois do retorno do Google, converte o usuario autenticado em JWT do proprio sistema.
    const token = jwt.sign(
      {
        id: req.user.id,
        email: req.user.email,
        role: req.user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    const user = encodeURIComponent(
      JSON.stringify({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      }),
    );

    // Redireciona para a tela de login do frontend levando token e usuario na query string.
    res.redirect(
      `${FRONTEND_LOGIN_URL}?token=${encodeURIComponent(token)}&user=${user}`,
    );
  },
);

export default router;

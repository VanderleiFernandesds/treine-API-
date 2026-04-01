import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

// Valida o login consultando o usuario no banco e gerando um JWT quando a senha confere.
export const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email e senha sao obrigatorios." });
  }

  // Busca o usuario pelo email para comparar a senha com o hash salvo.
  const sqlQuery = "SELECT * FROM users WHERE email = ?";

  db.query(sqlQuery, [email], async (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.length === 0) {
      return res.status(401).json({ error: "Credenciais invalidas." });
    }

    const user = result[0];

    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Credenciais invalidas." });
    }

    // O token carrega os dados minimos usados na autenticacao e autorizacao.
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.json({
      message: "Login realizado com sucesso.",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  });
};

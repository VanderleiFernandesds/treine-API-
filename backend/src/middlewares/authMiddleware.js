import jwt from "jsonwebtoken";

// Garante que a requisicao trouxe um JWT valido antes de continuar.
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token nao informado." });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token invalido." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token invalido ou expirado." });
  }
};

// Libera a rota somente para usuarios autenticados com role de administrador.
export const verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Acesso negado." });
  }

  next();
};


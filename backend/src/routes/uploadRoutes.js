import express from "express";
import upload from "../config/upload.js";
import { verifyAdmin, verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  verifyAdmin,
  // Aceita os nomes mais comuns usados em testes manuais e no frontend.
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  (req, res) => {
    // O frontend atual envia "file", mas mantemos "image" por compatibilidade.
    const uploadedFile = req.files?.image?.[0] ?? req.files?.file?.[0];

    if (!uploadedFile) {
      return res.status(400).json({ error: "Nenhum arquivo enviado." });
    }

    res.status(201).json({
      message: "Upload realizado com sucesso.",
      filename: uploadedFile.filename,
      path: `/uploads/${uploadedFile.filename}`,
    });
  },
);

export default router;

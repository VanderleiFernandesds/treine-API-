import multer from "multer";
import path from "path";

// Define onde o arquivo sera salvo e cria um nome unico para evitar sobrescrita.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Todos os uploads locais ficam na pasta backend/uploads.
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const baseName = path
      .basename(file.originalname, extension)
      .replace(/\s+/g, "-")
      .toLowerCase();

    cb(null, `${Date.now()}-${baseName}${extension}`);
  },
});

// Restringe o upload a formatos de imagem usados no projeto.
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
    return;
  }

  cb(new Error("Arquivo invalido. Envie uma imagem JPG, PNG, WEBP ou SVG."));
};

const upload = multer({
  storage,
  fileFilter,
});

// Instancia compartilhada pelo endpoint de upload do painel admin.
export default upload;

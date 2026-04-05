import { getUploadAuthHeaders } from "./httpHeaders.js";

const UPLOAD_API_URL = "http://localhost:3001/api/upload";

// Envia a imagem do produto para o backend e devolve o caminho salvo.
export async function uploadImagemProduto(file) {
  // O upload vai em multipart/form-data, por isso usamos FormData sem Content-Type manual.
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(UPLOAD_API_URL, {
    method: "POST",
    headers: getUploadAuthHeaders(),
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? `HTTP ${response.status}`);
  }

  return data;
}

// Arquivo-barrel mantido para compatibilidade enquanto os servicos ficam divididos.
export {
  atualizarProduto,
  criarProduto,
  deletarProduto,
  getProdutos,
} from "./productService.js";
export { uploadImagemProduto } from "./uploadService.js";

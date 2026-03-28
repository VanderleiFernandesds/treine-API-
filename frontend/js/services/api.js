export async function getProdutos() {
  const response = await fetch("http://localhost:3001/api/products");

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}
function getAuthHeaders() {
  const token = localStorage.getItem("auth_token");

  if (!token) {
    return {
      "Content-Type": "application/json",
    };
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

function getUploadHeaders() {
  const token = localStorage.getItem("auth_token");

  if (!token) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function getProdutos() {
  const response = await fetch("http://localhost:3001/api/products");

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}

export async function criarProduto(produto) {
  const response = await fetch("http://localhost:3001/api/products", {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(produto),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? `HTTP ${response.status}`);
  }

  return data;
}


export async function deletarProduto(id) {
  const response = await fetch(`http://localhost:3001/api/products/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),

  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? `HTTP ${response.status}`);
  }

  return data;
}


export async function atualizarProduto(id, produto) {
  const response = await fetch(`http://localhost:3001/api/products/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(produto),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? `HTTP ${response.status}`);
  }

  return data;
}

export async function uploadImagemProduto(file) {
  // O upload vai em multipart/form-data, por isso usamos FormData sem Content-Type manual.
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://localhost:3001/api/upload", {
    method: "POST",
    headers: getUploadHeaders(),
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? `HTTP ${response.status}`);
  }

  return data;
}

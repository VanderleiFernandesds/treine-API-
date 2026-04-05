function getAuthToken() {
  return localStorage.getItem("auth_token");
}

// Cabecalhos usados nas chamadas JSON autenticadas da aplicacao.
export function getJsonAuthHeaders() {
  const token = getAuthToken();

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

// Upload usa FormData, entao nao definimos Content-Type manualmente.
export function getUploadAuthHeaders() {
  const token = getAuthToken();

  if (!token) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}

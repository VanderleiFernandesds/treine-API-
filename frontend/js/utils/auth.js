// Converte o formato base64url do JWT para um formato legivel pelo navegador.
function decodeBase64Url(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");

  return atob(padded);
}

// Le apenas o payload do token para checar expiracao no frontend.
function decodeTokenPayload(token) {
  try {
    const [, payload] = token.split(".");

    if (!payload) {
      return null;
    }

    return JSON.parse(decodeBase64Url(payload));
  } catch (error) {
    return null;
  }
}

export function getAuthToken() {
  return localStorage.getItem("auth_token");
}

// Recupera com seguranca os dados do usuario salvos na sessao local.
export function getStoredUser() {
  const userData = localStorage.getItem("auth_user");

  if (!userData) {
    return null;
  }

  try {
    return JSON.parse(userData);
  } catch (error) {
    return null;
  }
}

// Remove completamente a sessao local ao fazer logout ou detectar dados invalidos.
export function clearAuthSession() {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_user");
}

// Considera a sessao ativa somente quando token, usuario e expiracao estao validos.
export function hasActiveSession() {
  const token = getAuthToken();
  const user = getStoredUser();

  if (!token || !user) {
    return false;
  }

  const payload = decodeTokenPayload(token);

  if (!payload || !payload.exp) {
    return false;
  }

  return payload.exp * 1000 > Date.now();
}

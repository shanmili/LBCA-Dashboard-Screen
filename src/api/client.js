const DEFAULT_API_BASE_URL = 'http://127.0.0.1:8000';

const trimTrailingSlash = (value) => value.replace(/\/+$/, '');

export const API_BASE_URL = trimTrailingSlash(
  import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL
);

export const TOKEN_STORAGE_KEY = 'auth_token';
export const LEGACY_TOKEN_STORAGE_KEY = 'authToken';

export const getAuthToken = () =>
  localStorage.getItem(TOKEN_STORAGE_KEY) ||
  localStorage.getItem(LEGACY_TOKEN_STORAGE_KEY);
export const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
  localStorage.setItem(LEGACY_TOKEN_STORAGE_KEY, token);
};
export const clearAuthToken = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(LEGACY_TOKEN_STORAGE_KEY);
};

const buildUrl = (path, params = {}) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = new URL(`${API_BASE_URL}${normalizedPath}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.append(key, String(value));
    }
  });

  return url.toString();
};

const parseJsonSafely = async (response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

const toErrorMessage = (payload, status) => {
  if (!payload) {
    return `Request failed with status ${status}`;
  }

  if (typeof payload === 'string') {
    return payload;
  }

  if (payload.detail || payload.message) {
    return payload.detail || payload.message;
  }

  const entries = Object.entries(payload);
  if (entries.length === 0) {
    return `Request failed with status ${status}`;
  }

  const [field, value] = entries[0];
  if (Array.isArray(value) && value.length > 0) {
    return `${field}: ${value[0]}`;
  }
  if (typeof value === 'string') {
    return `${field}: ${value}`;
  }

  return `Request failed with status ${status}`;
};

export async function apiRequest(path, options = {}) {
  const {
    method = 'GET',
    params,
    body,
    headers = {},
    auth = true,
  } = options;

  const token = getAuthToken();
  const requestHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };

  if (auth && token) {
    requestHeaders.Authorization = `Token ${token}`;
  }

  const url = buildUrl(path, params);
  
  try {
    const response = await fetch(url, {
      method,
      mode: 'cors',
      credentials: 'include',
      headers: requestHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    const contentType = response.headers.get('content-type');
    const isJsonResponse = contentType && contentType.includes('application/json');

    if (!isJsonResponse) {
      // Server returned HTML instead of JSON (likely an error page or wrong endpoint)
      const htmlContent = await response.text();
      console.error('Server returned HTML instead of JSON:', {
        url,
        method,
        status: response.status,
        statusText: response.statusText,
        htmlPreview: htmlContent.substring(0, 200),
      });
      throw new Error(
        `Server error (${response.status}): Endpoint may not exist or server misconfigured. Check VITE_API_BASE_URL and backend availability.`
      );
    }

    const payload = await response.json();

    if (!response.ok) {
      const message = toErrorMessage(payload, response.status);
      throw new Error(message);
    }

    return payload;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('Network error - backend may be down or unreachable:', error);
      throw new Error(
        `Cannot reach API server at ${url}. Check VITE_API_BASE_URL and ensure backend is running.`
      );
    }
    throw error;
  }
}

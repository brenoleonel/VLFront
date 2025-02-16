const BASE_URL = "http://localhost:3003";

interface ApiResponse<T> {
  data: T;
  message?: string;
  token?: string;
}

async function apiRequest<T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data?: unknown,
  headers: Record<string, string> = {}
): Promise<ApiResponse<T>> {
  try {
    const token = sessionStorage.getItem("token");

    const config: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
    };

    if (method !== "GET" && data) {
      config.body = JSON.stringify(data);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    const jsonResponse = await response.json();

    if (!response.ok) {
      console.error("Erro na requisição:", jsonResponse);
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    return { data: jsonResponse } as ApiResponse<T>;
  } catch (error) {
    console.error("rro na API:", error);
    throw error;
  }
}


export const api = {
  get: <T>(endpoint: string, headers: Record<string, string> = {}) =>
    apiRequest<T>(endpoint, "GET", undefined, headers),

  post: <T>(endpoint: string, data: unknown, headers: Record<string, string> = {}) =>
    apiRequest<T>(endpoint, "POST", data, headers),

  put: <T>(endpoint: string, data: unknown, headers: Record<string, string> = {}) =>
    apiRequest<T>(endpoint, "PUT", data, headers),

  delete: <T>(endpoint: string, headers: Record<string, string> = {}) =>
    apiRequest<T>(endpoint, "DELETE", undefined, headers),
};
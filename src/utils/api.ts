const BASE_URL = "http://localhost:3003";

interface ApiResponse<T> {
  data: T;
  message?: string;
  token?: string;
}

async function apiRequest<T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data?: unknown
): Promise<ApiResponse<T>> {
  try {
    const config: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (method !== "GET" && data) {
      console.log("Dados enviados:", data); // Verifique o payload
      config.body = JSON.stringify(data);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    console.log("Resposta da API:", response);

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Erro detalhado:", errorResponse);
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro na API:", error);
    throw error;
  }
}


export const api = {
  get: <T>(endpoint: string) => apiRequest<T>(endpoint, "GET"),
  post: <T>(endpoint: string, data: unknown) => apiRequest<T>(endpoint, "POST", data),
  put: <T>(endpoint: string, data: unknown) => apiRequest<T>(endpoint, "PUT", data),
  delete: <T>(endpoint: string) => apiRequest<T>(endpoint, "DELETE"), 
}
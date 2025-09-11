import axios from "axios";
import type { AxiosResponse, AxiosError } from "axios";
import { authService } from "../services/auth.service";
import { ApiError } from "../types/errors";

// Configuração base do Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar token de autenticação nas requisições
api.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // -- Remove Content-Type para FormData (axios detecta automaticamente)
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas e erros
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // -- Estrutura do erro da API
    const apiError = error.response?.data as {
      message?: string;
      statusCode?: number;
      errors?: string[];
    };

    let errorMessage = "Erro interno do servidor";

    // Se não há resposta do servidor (erro de rede)
    if (!error.response) {
      errorMessage =
        "Erro de conexão. Verifique sua internet ou se o servidor está rodando.";
    } else {
      switch (error.response?.status) {
        case 400:
          errorMessage = apiError?.message || "Dados inválidos";
          break;
        case 401:
          errorMessage = apiError?.message || "Credenciais inválidas";
          authService.clearAuthData();
          break;
        case 403:
          errorMessage = apiError?.message || "Acesso negado";
          break;
        case 404:
          errorMessage = apiError?.message || "Recurso não encontrado";
          break;
        case 409:
          errorMessage = apiError?.message || "Conflito: dados já existem";
          break;
        case 422:
          errorMessage = apiError?.message || "Dados de entrada inválidos";
          break;
        case 500:
          errorMessage = apiError?.message || "Erro interno do servidor";
          break;
        default:
          errorMessage =
            apiError?.message ||
            `Erro ${error.response?.status}: ${error.response?.statusText}`;
      }
    }

    // -- Rejeitar com erro
    return Promise.reject(
      new ApiError(errorMessage, error.response?.status, apiError)
    );
  }
);

export default api;

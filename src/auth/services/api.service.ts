import axios from "axios";
import type { AxiosResponse, AxiosError } from "axios";
import { toast } from "react-toastify";
import { authService } from "./auth.service";

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
    };

    let errorMessage = "Erro interno do servidor";

    // -- Tratamento específico por status code
    switch (error.response?.status) {
      case 400:
        errorMessage = apiError?.message || "Dados inválidos";
        break;
      case 401:
        errorMessage = "Credenciais inválidas";
        authService.clearAuthData();
        break;
      case 403:
        errorMessage = "Acesso negado";
        break;
      case 404:
        errorMessage = "Recurso não encontrado";
        break;
      case 422:
        errorMessage = apiError?.message || "Dados de entrada inválidos";
        break;
      case 500:
        errorMessage = "Erro interno do servidor";
        break;
      default:
        errorMessage = apiError?.message || "Erro desconhecido";
    }

    // -- Exibir toast de erro automaticamente
    toast.error(errorMessage);

    // -- Rejeitar com erro customizado
    return Promise.reject({
      message: errorMessage,
      status: error.response?.status,
      originalError: error,
    });
  }
);

export default api;

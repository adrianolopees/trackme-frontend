import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import type { AuthContextData } from "../types/auth.types";

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

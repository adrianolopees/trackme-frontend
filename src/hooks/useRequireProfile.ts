import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export function useRequireProfile() {
  const { profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!profile) {
      navigate("/login", { replace: true });
      return;
    }
  }, [profile, navigate]);

  if (!profile) {
    throw new Error("Profile não disponível - rota deve ser protegida!");
  }

  return profile;
}

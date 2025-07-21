import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export function useRequireProfile() {
  const { profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!profile) {
      // Usuário não logado — pode redirecionar para login, por exemplo:
      navigate("/login");
      return;
    }

    if (profile.profileSetupDone) {
      // Perfil completo — não pode acessar setup novamente
      navigate("/");
    }
  }, [profile, navigate]);

  if (!profile) {
    throw new Error("Profile não disponível - rota deve ser protegida!");
  }

  return profile;
}

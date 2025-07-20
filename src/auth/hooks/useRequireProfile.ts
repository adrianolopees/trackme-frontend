import { useAuth } from "./useAuth";

export function useRequireProfile() {
  const { profile } = useAuth();

  if (!profile) {
    throw new Error("Profile não disponível - rota deve ser protegida!");
  }

  return profile;
}

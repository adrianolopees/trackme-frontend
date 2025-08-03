import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../services/api.service";
import { useAuth } from "../hooks/useAuth";
import type {
  FollowContextData,
  FollowProviderProps,
} from "../types/follow.types";
import type { SafeProfile } from "../../schemas/authSchemas";

const FollowContext = createContext<FollowContextData>({} as FollowContextData);

export const FollowProvider: React.FC<FollowProviderProps> = ({ children }) => {
  const { profile, isAuthenticated } = useAuth();

  // Estados simples seguindo o padrão do AuthContext
  const [followers, setFollowers] = useState<SafeProfile[]>([]);
  const [following, setFollowing] = useState<SafeProfile[]>([]);
  const [loading, setLoading] = useState(false);

  // Função para buscar seguidores
  const loadFollowers = async (profileId?: number) => {
    if (!profile) return;

    const targetId = profileId || profile.id;
    setLoading(true);
    try {
      const { data: response } = await api.get(`/follow/${targetId}/followers`);
      setFollowers(response.data.followers || []);
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar seguindo
  const loadFollowing = async (profileId?: number) => {
    if (!profile) return;

    const targetId = profileId || profile.id;
    setLoading(true);
    try {
      const { data: response } = await api.get(`/follow/${targetId}/following`);
      setFollowing(response.data.followings || []);
    } finally {
      setLoading(false);
    }
  };

  // Função para seguir perfil
  const followProfile = async (targetProfileId: number) => {
    if (!profile) {
      toast.error("Você precisa estar logado para seguir alguém");
      return;
    }

    setLoading(true);
    try {
      await api.post(`/follow/${targetProfileId}`);
      toast.success("Perfil seguido com sucesso!");

      // Recarrega a lista de seguindo
      await loadFollowing(profile.id);
    } finally {
      setLoading(false);
    }
  };

  // Função para deixar de seguir
  const unfollowProfile = async (targetProfileId: number) => {
    if (!profile) {
      toast.error("Você precisa estar logado para deixar de seguir alguém");
      return;
    }

    setLoading(true);
    try {
      await api.delete(`/follow/${targetProfileId}`);
      toast.success("Perfil deixado de seguir com sucesso!");

      // Recarrega a lista de seguindo
      await loadFollowing(profile.id);
    } finally {
      setLoading(false);
    }
  };

  // Função utilitária para verificar se está seguindo
  const isFollowing = (targetProfileId: number): boolean => {
    return following.some((p) => p.id === targetProfileId);
  };

  // Carrega dados iniciais apenas se estiver autenticado
  useEffect(() => {
    if (isAuthenticated && profile) {
      loadFollowing(profile.id);
      loadFollowers(profile.id);
    }
  }, [isAuthenticated, profile?.id]);

  return (
    <FollowContext.Provider
      value={{
        followers,
        following,
        loading,
        followProfile,
        unfollowProfile,
        loadFollowers,
        loadFollowing,
        isFollowing,
      }}
    >
      {children}
    </FollowContext.Provider>
  );
};

export { FollowContext };

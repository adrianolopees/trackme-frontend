import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import type {
  FollowContextData,
  FollowProviderProps,
} from "../types/follow.types";
import type { SafeProfile } from "../../schemas/authSchemas";

import {
  fetchFollowers,
  fetchFollowing,
  followProfile as followService,
  unfollowProfile as unfollowService,
} from "../services/follow.service";
import { requireProfile } from "../../helpers/requireProfile";

const FollowContext = createContext<FollowContextData>({} as FollowContextData);

export const FollowProvider: React.FC<FollowProviderProps> = ({ children }) => {
  const { profile, isAuthenticated } = useAuth();
  const [followers, setFollowers] = useState<SafeProfile[]>([]);
  const [following, setFollowing] = useState<SafeProfile[]>([]);
  const [loading, setLoading] = useState(false);

  // Função para buscar seguidores
  const loadFollowers = async (profileId?: number) => {
    if (!requireProfile(profile)) return;

    const targetId = profileId || profile.id;
    setLoading(true);
    try {
      const data = await fetchFollowers(targetId);
      setFollowers(data);
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar seguindo
  const loadFollowing = async (profileId?: number) => {
    if (!requireProfile(profile)) return;

    const targetId = profileId || profile.id;
    setLoading(true);
    try {
      const data = await fetchFollowing(targetId);
      setFollowing(data);
    } finally {
      setLoading(false);
    }
  };

  // Função para seguir perfil
  const followProfile = async (targetProfileId: number) => {
    if (
      !requireProfile(profile, () =>
        toast.error("Você precisa estar logado para seguir")
      )
    ) {
      return;
    }

    setLoading(true);
    try {
      await followService(targetProfileId);
      toast.success("Perfil seguido com sucesso!");

      // Recarrega a lista de seguindo
      await loadFollowing(profile.id);
    } finally {
      setLoading(false);
    }
  };

  // Função para deixar de seguir
  const unfollowProfile = async (targetProfileId: number) => {
    if (
      !requireProfile(profile, () =>
        toast.error("Você precisa estar logado para deixar de seguir alguém")
      )
    ) {
      return;
    }
    setLoading(true);
    try {
      await unfollowService(targetProfileId);
      toast.success("Perfil deixado de seguir com sucesso!");

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

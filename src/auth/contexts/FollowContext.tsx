import React, { createContext, useState, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import api from "../services/api.service";
import { useRequireProfile } from "../hooks/useRequireProfile";
import type {
  FollowContextData,
  FollowProviderProps,
} from "../types/follow.types";
import type { SafeProfile } from "../../schemas/authSchemas";

// Tipagens para estados internos
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

interface FollowState {
  [profileId: number]: {
    data: SafeProfile[];
    loading: boolean;
    hasMore: boolean;
    page: number;
    total: number;
  };
}

interface OperationState {
  [profileId: number]: boolean;
}

const FollowContext = createContext<FollowContextData>({} as FollowContextData);

export const FollowProvider: React.FC<FollowProviderProps> = ({ children }) => {
  const profile = useRequireProfile();

  // Estados melhorados para suportar paginação e múltiplos perfis
  const [followers, setFollowers] = useState<FollowState>({});
  const [following, setFollowing] = useState<FollowState>({});
  const [followLoading, setFollowLoading] = useState<OperationState>({});
  const [unfollowLoading, setUnfollowLoading] = useState<OperationState>({});

  // Função utilitária para tratar erros
  const getErrorMessage = useCallback((error: unknown): string => {
    const apiError = error as ApiError;
    return (
      apiError?.response?.data?.message ||
      apiError?.message ||
      "Erro inesperado"
    );
  }, []);

  // Função para atualização otimista
  const updateFollowingOptimistically = useCallback(
    (
      profileId: number,
      targetProfileId: number,
      action: "add" | "remove",
      targetProfile?: SafeProfile
    ) => {
      setFollowing((prev) => {
        const current = prev[profileId];
        if (!current) return prev;

        let newData: SafeProfile[];

        if (action === "add" && targetProfile) {
          // Verifica se já existe para evitar duplicatas
          const exists = current.data.some((p) => p.id === targetProfileId);
          newData = exists ? current.data : [...current.data, targetProfile];
        } else {
          newData = current.data.filter((p) => p.id !== targetProfileId);
        }

        return {
          ...prev,
          [profileId]: {
            ...current,
            data: newData,
            total: action === "add" ? current.total + 1 : current.total - 1,
          },
        };
      });
    },
    []
  );

  // Função otimizada para carregar seguindo (declarada antes para evitar hoisting issues)
  const loadFollowing = useCallback(
    async (profileId = profile.id, page = 1, limit = 10) => {
      try {
        setFollowing((prev) => ({
          ...prev,
          [profileId]: {
            ...prev[profileId],
            loading: true,
            data: prev[profileId]?.data || [],
            hasMore: prev[profileId]?.hasMore ?? true,
            page: prev[profileId]?.page || 1,
            total: prev[profileId]?.total || 0,
          },
        }));

        const { data: response } = await api.get(
          `/follow/${profileId}/following?page=${page}&limit=${limit}`
        );

        setFollowing((prev) => {
          const currentData = prev[profileId]?.data || [];
          const newData =
            page === 1 ? response.data : [...currentData, ...response.data];

          return {
            ...prev,
            [profileId]: {
              data: newData,
              loading: false,
              hasMore: response.pagination?.hasMore ?? false,
              page: response.pagination?.page || page,
              total: response.pagination?.total || response.data.length,
            },
          };
        });
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        toast.error(`Erro ao carregar seguindo: ${errorMessage}`);

        setFollowing((prev) => ({
          ...prev,
          [profileId]: {
            ...prev[profileId],
            loading: false,
          },
        }));
        throw error;
      }
    },
    [profile.id, getErrorMessage]
  );

  // Função otimizada para follow
  const followProfile = useCallback(
    async (targetProfileId: number) => {
      try {
        setFollowLoading((prev) => ({ ...prev, [targetProfileId]: true }));

        // Busca dados do perfil target para otimistic update
        let targetProfile: SafeProfile | undefined;
        try {
          const { data } = await api.get(`/profiles/${targetProfileId}`);
          targetProfile = data;
        } catch {
          // Se não conseguir buscar, continua sem otimistic update
        }

        // Otimistic update
        if (targetProfile) {
          updateFollowingOptimistically(
            profile.id,
            targetProfileId,
            "add",
            targetProfile
          );
        }

        await api.post(`/follow/${targetProfileId}`);
        toast.success("Perfil seguido com sucesso!");

        // Recarrega dados apenas se não fez otimistic update
        if (!targetProfile) {
          await loadFollowing(profile.id);
        }
      } catch (error) {
        // Reverte otimistic update em caso de erro
        updateFollowingOptimistically(profile.id, targetProfileId, "remove");

        const errorMessage = getErrorMessage(error);
        toast.error(`Erro ao seguir perfil: ${errorMessage}`);
        throw error;
      } finally {
        setFollowLoading((prev) => ({ ...prev, [targetProfileId]: false }));
      }
    },
    [profile.id, updateFollowingOptimistically, getErrorMessage, loadFollowing]
  );

  // Função otimizada para unfollow
  const unfollowProfile = useCallback(
    async (targetProfileId: number) => {
      // Salva dados para possível rollback ANTES do try/catch
      const profileToRestore = following[profile.id]?.data?.find(
        (p) => p.id === targetProfileId
      );

      try {
        setUnfollowLoading((prev) => ({ ...prev, [targetProfileId]: true }));

        // Otimistic update
        updateFollowingOptimistically(profile.id, targetProfileId, "remove");

        await api.delete(`/follow/${targetProfileId}`);
        toast.success("Perfil deixado de seguir com sucesso!");
      } catch (error) {
        // Reverte otimistic update em caso de erro
        if (profileToRestore) {
          updateFollowingOptimistically(
            profile.id,
            targetProfileId,
            "add",
            profileToRestore
          );
        }

        const errorMessage = getErrorMessage(error);
        toast.error(`Erro ao deixar de seguir: ${errorMessage}`);
        throw error;
      } finally {
        setUnfollowLoading((prev) => ({ ...prev, [targetProfileId]: false }));
      }
    },
    [profile.id, following, updateFollowingOptimistically, getErrorMessage]
  );

  // Função otimizada para carregar seguidores
  const loadFollowers = useCallback(
    async (profileId = profile.id, page = 1, limit = 10) => {
      try {
        // Atualiza loading apenas para o perfil específico
        setFollowers((prev) => ({
          ...prev,
          [profileId]: {
            ...prev[profileId],
            loading: true,
            data: prev[profileId]?.data || [],
            hasMore: prev[profileId]?.hasMore ?? true,
            page: prev[profileId]?.page || 1,
            total: prev[profileId]?.total || 0,
          },
        }));

        const { data: response } = await api.get(
          `/follow/${profileId}/followers?page=${page}&limit=${limit}`
        );

        setFollowers((prev) => {
          const currentData = prev[profileId]?.data || [];
          const newData =
            page === 1 ? response.data : [...currentData, ...response.data];

          return {
            ...prev,
            [profileId]: {
              data: newData,
              loading: false,
              hasMore: response.pagination?.hasMore ?? false,
              page: response.pagination?.page || page,
              total: response.pagination?.total || response.data.length,
            },
          };
        });
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        toast.error(`Erro ao carregar seguidores: ${errorMessage}`);

        setFollowers((prev) => ({
          ...prev,
          [profileId]: {
            ...prev[profileId],
            loading: false,
          },
        }));
        throw error;
      }
    },
    [profile.id, getErrorMessage]
  );

  // Funções utilitárias otimizadas
  const isFollowing = useCallback(
    (targetProfileId: number): boolean => {
      return (
        following[profile.id]?.data?.some((p) => p.id === targetProfileId) ??
        false
      );
    },
    [following, profile.id]
  );

  const isLoadingFollow = useCallback(
    (targetProfileId: number): boolean => {
      return followLoading[targetProfileId] ?? false;
    },
    [followLoading]
  );

  const isLoadingUnfollow = useCallback(
    (targetProfileId: number): boolean => {
      return unfollowLoading[targetProfileId] ?? false;
    },
    [unfollowLoading]
  );

  const getFollowersFor = useCallback(
    (profileId: number): SafeProfile[] => {
      return followers[profileId]?.data || [];
    },
    [followers]
  );

  const getFollowingFor = useCallback(
    (profileId: number): SafeProfile[] => {
      return following[profileId]?.data || [];
    },
    [following]
  );

  const isLoadingFollowersFor = useCallback(
    (profileId: number): boolean => {
      return followers[profileId]?.loading ?? false;
    },
    [followers]
  );

  const isLoadingFollowingFor = useCallback(
    (profileId: number): boolean => {
      return following[profileId]?.loading ?? false;
    },
    [following]
  );

  // Memorização do valor do contexto para evitar re-renders desnecessários
  const contextValue = useMemo(
    () => ({
      followers,
      following,
      followLoading,
      unfollowLoading,
      followProfile,
      unfollowProfile,
      loadFollowers,
      loadFollowing,
      isFollowing,
      isLoadingFollow,
      isLoadingUnfollow,
      getFollowersFor,
      getFollowingFor,
      isLoadingFollowersFor,
      isLoadingFollowingFor,
    }),
    [
      followers,
      following,
      followLoading,
      unfollowLoading,
      followProfile,
      unfollowProfile,
      loadFollowers,
      loadFollowing,
      isFollowing,
      isLoadingFollow,
      isLoadingUnfollow,
      getFollowersFor,
      getFollowingFor,
      isLoadingFollowersFor,
      isLoadingFollowingFor,
    ]
  );

  return (
    <FollowContext.Provider value={contextValue}>
      {children}
    </FollowContext.Provider>
  );
};

export { FollowContext };

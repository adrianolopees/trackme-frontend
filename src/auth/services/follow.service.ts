// services/follow.service.ts
import api from "./api.service";
import type { SafeProfile } from "../../schemas/authSchemas";

// Buscar seguidores de um perfil
export const fetchFollowers = async (
  profileId: number
): Promise<SafeProfile[]> => {
  const { data } = await api.get(`/follow/${profileId}/followers`);
  return data.data.followers || [];
};

// Buscar perfis que o usuário está seguindo
export const fetchFollowing = async (
  profileId: number
): Promise<SafeProfile[]> => {
  const { data } = await api.get(`/follow/${profileId}/following`);
  return data.data.followings || [];
};

// Seguir um perfil
export const followProfile = async (targetProfileId: number): Promise<void> => {
  await api.post(`/follow/${targetProfileId}`);
};

// Deixar de seguir um perfil
export const unfollowProfile = async (
  targetProfileId: number
): Promise<void> => {
  await api.delete(`/follow/${targetProfileId}`);
};

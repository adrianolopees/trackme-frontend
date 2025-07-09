import type { ProfileData } from "../services/authService";

export const removeHeavyFields = (
  profile: ProfileData
): Omit<ProfileData, "avatar"> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { avatar, ...safeProfile } = profile;
  return safeProfile;
};

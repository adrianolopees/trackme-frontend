import type { SafeProfile } from "../schemas/profileSchemas";

export function requireProfile(
  profile: SafeProfile | null,
  onError?: () => void
): profile is SafeProfile {
  if (!profile) {
    if (onError) onError();
    return false;
  }
  return true;
}

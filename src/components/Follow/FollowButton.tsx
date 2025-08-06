import React from "react";
import { useFollow } from "../../follow/hooks/useFollow";

interface FollowButtonProps {
  targetProfileId: number;
  className?: string;
}

export const FollowButton: React.FC<FollowButtonProps> = ({
  targetProfileId,
  className = "",
}) => {
  const { followProfile, unfollowProfile, isFollowing, loading } = useFollow();

  const isFollowingUser = isFollowing(targetProfileId);

  const handleClick = async () => {
    if (isFollowingUser) {
      await unfollowProfile(targetProfileId);
    } else {
      await followProfile(targetProfileId);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`px-4 py-2 rounded font-medium transition-colors ${
        isFollowingUser
          ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
          : "bg-blue-500 text-white hover:bg-blue-600"
      } disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {loading ? "..." : isFollowingUser ? "Deixar de seguir" : "Seguir"}
    </button>
  );
};

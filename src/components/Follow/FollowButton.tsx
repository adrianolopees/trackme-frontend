import React from "react";
import { useFollow } from "../../hooks/useFollow";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { GradientButton } from "../index";

type FollowButtonProps = {
  targetProfileId: number;
  onFollow?: () => void;
  onUnfollow?: () => void;
};

export const FollowButton: React.FC<FollowButtonProps> = ({
  targetProfileId,
  onFollow,
  onUnfollow,
}) => {
  const { isAuthenticated, profile: currentUser } = useAuth();
  const navigate = useNavigate();
  const {
    followProfile,
    unfollowProfile,
    isFollowing,
    isFollowingLoading,
    isUnfollowingLoading,
  } = useFollow();

  const isOwner = currentUser?.id === targetProfileId;
  if (!isAuthenticated || isOwner) {
    return null;
  }

  const isCurrentlyFollowing = isFollowing(targetProfileId);
  const loading = isCurrentlyFollowing
    ? isUnfollowingLoading
    : isFollowingLoading;

  const handleToggle = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (isCurrentlyFollowing) {
      await unfollowProfile(targetProfileId);
      onUnfollow?.(); // Atualiza contador na página
    } else {
      await followProfile(targetProfileId);
      onFollow?.(); // Atualiza contador na página
    }
  };

  return (
    <GradientButton
      onClick={handleToggle}
      loading={loading}
      disabled={loading}
      type="button"
    >
      {isCurrentlyFollowing ? "Deixar de seguir" : "Seguir"}
    </GradientButton>
  );
};

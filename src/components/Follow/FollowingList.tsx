import React from "react";
import { useFollow } from "../../auth/hooks/useFollow";

export const FollowingList: React.FC = () => {
  const { following, loading, unfollowProfile } = useFollow();

  if (loading) {
    return <div>Carregando seguindo...</div>;
  }

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Seguindo ({following.length})</h3>
      {following.length === 0 ? (
        <p className="text-gray-500">Não está seguindo ninguém ainda.</p>
      ) : (
        <div className="space-y-2">
          {following.map((followedUser) => (
            <div
              key={followedUser.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-2">
                <img
                  src={followedUser.avatar || "/default-avatar.png"}
                  alt={followedUser.name}
                  className="w-8 h-8 rounded-full"
                />
                <span>{followedUser.name}</span>
              </div>
              <button
                onClick={() => unfollowProfile(followedUser.id)}
                disabled={loading}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Deixar de seguir
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

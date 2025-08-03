import React from "react";
import { useFollow } from "../../auth/hooks/useFollow";

export const FollowersList: React.FC = () => {
  const { followers, loading } = useFollow();

  if (loading) {
    return <div>Carregando seguidores...</div>;
  }

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Seguidores ({followers.length})</h3>
      {followers.length === 0 ? (
        <p className="text-gray-500">Nenhum seguidor ainda.</p>
      ) : (
        <div className="space-y-2">
          {followers.map((follower) => (
            <div key={follower.id} className="flex items-center space-x-2">
              <img
                src={follower.avatar || "/default-avatar.png"}
                alt={follower.name}
                className="w-8 h-8 rounded-full"
              />
              <span>{follower.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

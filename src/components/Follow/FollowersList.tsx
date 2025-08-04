import { useFollow } from "../../auth/hooks/useFollow";
import Avatar from "../Avatar/Avatar";

export const FollowersList = () => {
  const { followers, loading } = useFollow();

  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {followers.length === 0 ? (
        <p className="text-gray-500 text-center py-4">Nenhum seguidor ainda.</p>
      ) : (
        followers.map((follower) => (
          <div
            key={follower.id}
            className="flex items-center justify-between p-2 bg-gray-50 rounded"
          >
            <div className="flex items-center space-x-2">
              <Avatar src={follower.avatar} size={32} className="w-8 h-8" />
              <span className="text-sm font-medium">{follower.name}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

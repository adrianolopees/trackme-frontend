import { useFollow } from "../../auth/hooks/useFollow";
import Avatar from "../Avatar/Avatar";

export const FollowingList = () => {
  const { following, loading, unfollowProfile } = useFollow();

  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {following.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          Não está seguindo ninguém ainda.
        </p>
      ) : (
        following.map((followedUser) => (
          <div
            key={followedUser.id}
            className="flex items-center justify-between p-2 bg-gray-50 rounded"
          >
            <div className="flex items-center space-x-2">
              <Avatar
                src={followedUser.avatar}
                size={96}
                className="mx-auto mb-4"
              />
              <span className="text-sm font-medium">{followedUser.name}</span>
            </div>
            <button
              onClick={() => unfollowProfile(followedUser.id)}
              disabled={loading}
              className="text-red-500 hover:text-red-700 text-xs px-2 py-1 rounded transition-colors disabled:opacity-50"
            >
              Deixar de seguir
            </button>
          </div>
        ))
      )}
    </div>
  );
};

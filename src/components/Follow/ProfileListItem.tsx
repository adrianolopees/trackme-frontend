import { FiChevronRight } from "react-icons/fi";
import Avatar from "../ui/Avatar";
import type { PublicProfile } from "../../schemas/profileSchemas";

interface ProfileListItemProps {
  profile: PublicProfile;
  onClick: () => void;
  actions?: React.ReactNode;
}

const ProfileListItem = ({
  profile,
  onClick,
  actions,
}: ProfileListItemProps) => (
  <div
    className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors active:bg-gray-100 cursor-pointer"
    onClick={onClick}
  >
    <Avatar src={profile.avatar} size={48} />
    <div className="flex-1 min-w-0">
      <p className="font-medium text-gray-900 truncate">{profile.username}</p>
      {profile.name && (
        <p className="text-sm text-gray-500 truncate">{profile.name}</p>
      )}
    </div>
    {actions || <FiChevronRight size={16} className="text-gray-400" />}
  </div>
);

export default ProfileListItem;

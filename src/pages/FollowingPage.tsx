import { useParams } from "react-router-dom";
import { fetchFollowing } from "../follow/services/follow.service";

import { FollowList } from "../components";

const FollowersPage = () => {
  const { profileId } = useParams();
  return (
    <FollowList
      profileId={Number(profileId)}
      type="following"
      fetchFunction={fetchFollowing}
    />
  );
};

export default FollowersPage;

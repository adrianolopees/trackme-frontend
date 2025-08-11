import { useParams } from "react-router-dom";
import { fetchFollowing } from "../services/follow.service";

import { FollowList } from "../components";

const FollowingPage = () => {
  const { profileId } = useParams();
  return (
    <FollowList
      profileId={Number(profileId)}
      type="following"
      fetchFunction={fetchFollowing}
    />
  );
};

export default FollowingPage;

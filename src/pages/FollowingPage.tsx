import { useParams } from "react-router-dom";
import { followService } from "../services/follow.service";

import { FollowList } from "../components";

const FollowingPage = () => {
  const { profileId } = useParams();
  return (
    <FollowList
      profileId={Number(profileId)}
      type="following"
      fetchFunction={followService.fetchFollowing}
    />
  );
};

export default FollowingPage;

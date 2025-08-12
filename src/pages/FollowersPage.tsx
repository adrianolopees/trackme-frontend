import { useParams } from "react-router-dom";
import { followService } from "../services/follow.service";

import { FollowList } from "../components";

const FollowersPage = () => {
  const { profileId } = useParams();
  return (
    <FollowList
      profileId={Number(profileId)}
      type="followers"
      fetchFunction={followService.fetchFollowers}
    />
  );
};

export default FollowersPage;

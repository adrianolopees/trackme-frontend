import { useParams } from "react-router-dom";
import { fetchFollowers } from "../auth/services/follow.service";

import { FollowList } from "../components";

const FollowersPage = () => {
  const { profileId } = useParams();
  return (
    <FollowList
      profileId={Number(profileId)}
      type="followers"
      fetchFunction={fetchFollowers}
    />
  );
};

export default FollowersPage;

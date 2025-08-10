import { useParams } from "react-router-dom";
import { useFollowersInfiniteQuery } from "../hooks/useFollowersInfiniteQuery";
import ProfileListItem from "../components/Follow/ProfileListItem";
import { GradientButton, ButtonSpinner } from "../components/index"; // ou seu botão

const FollowersPage = () => {
  const { id } = useParams();
  const profileId = Number(id);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useFollowersInfiniteQuery(profileId);

  if (isLoading) return <ButtonSpinner />;
  if (isError) return <p>Erro ao carregar seguidores.</p>;

  const followers = data?.pages.flatMap((page) => page.followers) || [];

  return (
    <div className="p-4 space-y-2">
      {followers.map((profile) => (
        <ProfileListItem
          key={profile.id}
          profile={profile}
          onClick={() => {
            // navega para o perfil
          }}
        />
      ))}

      {hasNextPage && (
        <GradientButton
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="w-full"
        >
          {isFetchingNextPage ? "Carregando..." : "Ver mais"}
        </GradientButton>
      )}
    </div>
  );
};

export default FollowersPage;

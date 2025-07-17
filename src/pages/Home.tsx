import { useAuth } from "../auth/hooks/useAuth";
import {
  FullPageSpinner,
  PageWrapper,
  UserGreeting,
  AuthButtons,
} from "../components";

function Home() {
  const { isAuthenticated, profile, loading } = useAuth();

  return (
    <PageWrapper>
      {loading && <FullPageSpinner />}
      <h1 className="text-4xl font-bold mb-6 text-blue-600">TrackMe</h1>

      {isAuthenticated && profile ? (
        <UserGreeting profile={profile} loading={loading} />
      ) : (
        <AuthButtons />
      )}

      <div className="mt-12 text-center max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          O que é o TrackMe?
        </h2>

        <p className="text-gray-600 leading-relaxed">
          Transforme playlists em conexões.”
        </p>
      </div>
    </PageWrapper>
  );
}

export default Home;

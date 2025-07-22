import { useAuth } from "../auth/hooks/useAuth";
import {
  FullPageSpinner,
  PageWrapper,
  UserGreeting,
  AuthButtons,
} from "../components";
import { FiShare2, FiUsers, FiUser, FiMusic } from "react-icons/fi";

function Home() {
  const { isAuthenticated, profile, loading } = useAuth();

  return (
    <PageWrapper>
      {loading && <FullPageSpinner />}
      <h1 className="text-4xl font-bold mb-6 text-blue-600">TrackMe</h1>

      {isAuthenticated ? (
        <UserGreeting profile={profile!} loading={loading} />
      ) : (
        <AuthButtons />
      )}

      <div className="mt-22 text-center max-w-2xl">
        <h2 className="text-2xl font-semibold text- mb-8 text-gray-800">
          O que é o TrackMe?
        </h2>

        <ul className="space-y-3 text-gray-600 leading-relaxed">
          <li className="flex items-start gap-3">
            <FiShare2 className="text-primary mt-1" size={18} />
            <span>Transforme playlists em conexões.</span>
          </li>
          <li className="flex items-start gap-3">
            <FiUsers className="text-primary mt-1" size={18} />
            <span>Sua vibe atrai sua tribo.</span>
          </li>
          <li className="flex items-start gap-3">
            <FiMusic className="text-primary mt-1" size={18} />
            <span>Mesma música, nova amizade.</span>
          </li>
          <li className="flex items-start gap-3">
            <FiUser className="text-primary mt-1" size={18} />
            <span>Seu perfil, suas regras, sua essência.</span>
          </li>
        </ul>
      </div>
    </PageWrapper>
  );
}

export default Home;

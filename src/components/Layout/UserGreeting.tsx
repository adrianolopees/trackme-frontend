import { Link } from "react-router-dom";
import GradientButton from "../ui/GradientButton";
import { FaUser } from "react-icons/fa";

interface UserGreetingProps {
  profile: {
    name?: string;
    username: string;
  };
  loading: boolean;
}

export default function UserGreeting({ profile, loading }: UserGreetingProps) {
  return (
    <div className="text-center">
      <p className="mb-6 text-gray-700 text-lg">
        Olá,{" "}
        <span className="font-semibold text-blue-600">
          {profile.name || profile.username}
        </span>
        !
      </p>
      <p className="mb-6 text-gray-600">Bem-vindo de volta ao TrackMe</p>
      <div className="flex gap-4">
        <Link to="/profile">
          <GradientButton
            type="submit"
            loading={loading}
            disabled={loading}
            icon={<FaUser />}
            loadingText="Entrando..."
          >
            ir para Perfil
          </GradientButton>
        </Link>
      </div>
    </div>
  );
}

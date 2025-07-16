import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import GradientButton from "./GradientButton";

interface AuthButtonsProps {
  loading: boolean;
}

export default function AuthButtons({ loading }: AuthButtonsProps) {
  return (
    <div className="text-center">
      <p className="mb-6 text-gray-700 text-lg">Bem-vindo! Comece agora:</p>
      <div className="flex gap-4 flex-wrap justify-center">
        <Link to="/login">
          <GradientButton
            type="submit"
            loading={loading}
            disabled={loading}
            icon={<FaUser />}
            loadingText="Entrando..."
          >
            Login
          </GradientButton>
        </Link>

        <Link
          to="/register"
          className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
        >
          Cadastre-se
        </Link>
      </div>
    </div>
  );
}

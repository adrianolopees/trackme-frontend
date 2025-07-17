import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import GradientButton from "./GradientButton";

export default function AuthButtons() {
  return (
    <div className="text-center">
      <p className="mb-6 text-gray-700 text-lg">Bem-vindo! Comece agora:</p>
      <div className="flex gap-4 flex-wrap justify-center">
        <Link to="/login">
          <GradientButton type="button" icon={<FaUser />}>
            Login
          </GradientButton>
        </Link>

        <Link
          to="/register"
          className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium flex items-center justify-center gap-2 min-w-[150px]"
        >
          Cadastre-se
        </Link>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import GradientButton from "./GradientButton";

export default function AuthButtons() {
  return (
    <div className="flex items-center gap-4">
      <Link to="/login">
        <GradientButton type="button" icon={<FaUser />}>
          Login
        </GradientButton>
      </Link>
      <Link
        to="/register"
        className="bg-gray-200 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-300 transition-colors font-medium text-sm flex items-center justify-center gap-2"
      >
        Cadastre-se
      </Link>
    </div>
  );
}

import { Link } from "react-router-dom";
import { FiSettings } from "react-icons/fi";

export default function ProfileSettingsButton() {
  return (
    <Link to="/profile-setup" title="Editar perfil">
      <button className="fixed bottom-6 right-6 z-40 bg-white border border-gray-300 shadow-md hover:bg-gray-100 transition p-3 rounded-full">
        <FiSettings size={20} className="text-gray-700" />
      </button>
    </Link>
  );
}

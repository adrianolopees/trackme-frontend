import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">TrackMe</h1>
      <p className="mb-6 text-gray-700 text-center">Bem-vindo! Comece agora:</p>
      <div className="flex gap-4">
        <Link
          to="/login"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300"
        >
          Cadastre-se
        </Link>
      </div>
    </div>
  );
}

export default Home;

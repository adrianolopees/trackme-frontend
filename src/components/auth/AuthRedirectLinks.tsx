import { Link } from "react-router-dom";

interface AuthRedirectLinksProps {
  alternate?: "login" | "register";
}

export default function AuthRedirectLinks({
  alternate = "register",
}: AuthRedirectLinksProps) {
  return (
    <div className="text-sm mt-4 text-center space-y-2">
      {alternate === "register" ? (
        <p>
          Ainda não tem conta?{" "}
          <Link
            to="/register"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Cadastre-se
          </Link>
        </p>
      ) : (
        <p>
          Já tem uma conta?{" "}
          <Link
            to="/login"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Entrar
          </Link>
        </p>
      )}

      <p>
        <Link to="/" className="text-gray-600 underline hover:text-gray-800">
          Voltar ao início
        </Link>
      </p>
    </div>
  );
}

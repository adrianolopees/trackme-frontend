import { Link } from "react-router-dom";

// Interface que define as props do componente
interface AuthRedirectLinksProps {
  alternate?: "login" | "register"; // Union type: só aceita esses 2 valores
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
            to="/register" // Rota para página de cadastro
            className="text-blue-600 underline hover:text-blue-800"
          >
            Cadastre-se
          </Link>
        </p>
      ) : (
        <p>
          Já tem uma conta?{" "}
          <Link
            to="/login" // Rota para página de login
            className="text-blue-600 underline hover:text-blue-800"
          >
            Entrar
          </Link>
        </p>
      )}

      <p>
        <Link
          to="/" // Rota raiz da aplicação
          className="text-gray-600 underline hover:text-gray-800"
        >
          Voltar ao início
        </Link>
      </p>
    </div>
  );
}

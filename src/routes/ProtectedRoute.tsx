import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FullPageSpinner } from "../components";

type ProtectedRoutesProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRoutesProps) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        <FullPageSpinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Somente verifica se está autenticado
  return <>{children}</>;
};

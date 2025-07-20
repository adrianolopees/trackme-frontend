import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/hooks/useAuth";

type ProtectedRoutesProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRoutesProps) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Carregando...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { followService } from "../services/follow.service";
import { FollowList } from "../components";

const FollowersPage = () => {
  const { id } = useParams(); // ✅ Mudou de 'profileId' para 'id'
  const navigate = useNavigate();

  // Converte para número e valida
  const numericProfileId = id ? Number(id) : NaN;

  // Redireciona se o ID for inválido
  useEffect(() => {
    if (!id || isNaN(numericProfileId)) {
      console.error("ID de perfil inválido:", id);
      navigate("/"); // ou para onde você quiser redirecionar
      return;
    }
  }, [id, numericProfileId, navigate]);

  // Se o ID não for válido, não renderiza nada (ou um loading)
  if (!id || isNaN(numericProfileId)) {
    return <div>Carregando...</div>;
  }

  return (
    <FollowList
      profileId={numericProfileId}
      type="followers"
      fetchFunction={followService.fetchFollowers}
    />
  );
};

export default FollowersPage;

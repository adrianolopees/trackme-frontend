import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import GradientButton from "../components/GradientButton";

export default function ProfileSetup() {
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!bio || !avatar) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);

    // CORREÇÃO: Criar FormData corretamente
    const formData = new FormData();
    formData.append("bio", bio);
    formData.append("avatar", avatar); // Nome deve corresponder ao esperado no backend

    try {
      // CORREÇÃO: Não precisa mais definir headers manualmente
      await api.put("/profile/me", formData);

      toast.success("Perfil configurado com sucesso!");
      navigate("/profile");
    } catch (error) {
      console.error("Erro ao configurar perfil:", error);
      toast.error("Erro ao configurar perfil. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-4">Complete seu perfil</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Bio</label>
          <textarea
            className="w-full p-2 border rounded-lg"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Conte um pouco sobre você..."
            rows={4}
            disabled={loading}
          />
        </div>

        <div>
          <label className="block font-medium">Avatar</label>
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setAvatar(e.target.files[0]);
              }
            }}
            disabled={loading}
            className="w-full p-2 border rounded-lg"
          />
          {avatar && (
            <p className="text-sm text-gray-600 mt-1">
              Arquivo selecionado: {avatar.name}
            </p>
          )}
        </div>

        <GradientButton
          type="submit"
          loading={loading}
          loadingText="Configurando..."
          disabled={loading}
          icon={null}
        >
          Salvar
        </GradientButton>
      </form>
    </div>
  );
}

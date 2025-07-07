import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import GradientButton from "../components/GradientButton";

export default function ProfileSetup() {
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!bio || !avatar) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    const formData = new FormData();
    formData.append("bio", bio);
    formData.append("avatar", avatar);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Você precisa estar logado para configurar o perfil.");
        return;
      }
      // Envia os dados do perfil para o backend
      // Certifique-se de que o endpoint está correto e aceita FormData
      await api.put("/profile/me", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Perfil configurado com sucesso!");
      navigate("/profile");
    } catch (error) {
      console.error("Erro ao configurar perfil:", error);
      toast.error("Erro ao configurar perfil. Tente novamente.");
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
          />
        </div>

        <div>
          <label className="block font-medium">Avatar</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setAvatar(e.target.files![0]);
              }
            }}
          />
        </div>
        <GradientButton
          type="submit"
          loading={false}
          loadingText="Configurando..."
          icon={null}
        >
          Salvar
        </GradientButton>
      </form>
    </div>
  );
}

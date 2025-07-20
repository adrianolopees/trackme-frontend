import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/hooks/useAuth";
import api from "../auth/services/api.service";
import { toast } from "react-toastify";
import {
  GradientButton,
  PageWrapper,
  AvatarInput,
  SkipButton,
} from "../components/index";

export default function ProfileSetup() {
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { setProfile } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!bio || !avatar) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("bio", bio);
    formData.append("avatar", avatar);

    try {
      const response = await api.put("/profile/me", formData);
      const updatedProfile = response.data.data;

      setProfile(updatedProfile);
      toast.success("Perfil configurado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Erro ao configurar perfil:", error);
      toast.error("Erro ao configurar perfil. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("bio", bio || ""); // bio vazio
    // avatar não será enviado
    try {
      const response = await api.put("/profile/me", formData);
      const updatedProfile = response.data.data;

      setProfile(updatedProfile);
      toast.success("Perfil será completado depois!");
      navigate("/");
    } catch (error) {
      console.error("Erro ao pular configuração de perfil:", error);
      toast.error("Erro ao continuar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="bg-white rounded-lg text-center shadow-lg p-8 w-full max-w-md">
        <h2 className="text-4xl font-bold mb-6 text-blue-600">
          Complete seu perfil
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center">
            <AvatarInput
              onFileSelect={(file) => {
                setAvatar(file);
              }}
              disabled={loading}
            />
          </div>

          <div>
            <textarea
              className="w-full p-1 border border-blue-600 rounded-lg resize-none"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Conte um pouco sobre você..."
              rows={4}
              disabled={loading}
            />
          </div>

          <div className="flex gap-2 justify-between mt-6">
            <GradientButton
              type="submit"
              loading={loading}
              loadingText="Configurando..."
              disabled={loading}
              icon={null}
            >
              Salvar
            </GradientButton>

            <SkipButton onClick={handleSkip} disabled={loading} />
          </div>
        </form>
      </div>
    </PageWrapper>
  );
}

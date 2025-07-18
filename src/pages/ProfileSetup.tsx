import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../auth/services/api.service";
import { toast } from "react-toastify";
import { GradientButton, PageWrapper, AvatarInput } from "../components/index";
import { useAuth } from "../auth/hooks/useAuth";

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
      navigate("/profile");
    } catch (error) {
      console.error("Erro ao configurar perfil:", error);
      toast.error("Erro ao configurar perfil. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-4">Complete seu perfil</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div>
              <label className="block font-medium mb-2">Avatar</label>
              <AvatarInput
                onFileSelect={(file) => {
                  setAvatar(file);
                }}
                disabled={loading}
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Bio</label>
              <textarea
                className="w-full p-2 border rounded-lg resize-none"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Conte um pouco sobre você..."
                rows={4}
                disabled={loading}
              />
            </div>
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
    </PageWrapper>
  );
}

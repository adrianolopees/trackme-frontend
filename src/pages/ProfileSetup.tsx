import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../auth/services/api.service";
import { toast } from "react-toastify";
import { GradientButton, PageWrapper } from "../components/index";
import { useAuth } from "../auth/hooks/useAuth";
import { FaCamera } from "react-icons/fa";

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
            <label className="block font-medium mb-2">Avatar</label>

            <div className="flex items-start gap-4 justify-center ">
              <div className="space-y-2 ">
                <label
                  htmlFor="avatar"
                  title="Clique para selecionar avatar"
                  className="w-20 h-20 flex items-center justify-center rounded-lg border border-gray-300 overflow-hidden cursor-pointer"
                >
                  {avatar ? (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt="Preview do avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaCamera className="text-gray-400 text-3xl" />
                  )}
                </label>

                <input
                  id="avatar"
                  type="file"
                  accept="image/jpeg, image/png"
                  disabled={loading}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setAvatar(file);
                  }}
                  className="hidden"
                />
              </div>
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

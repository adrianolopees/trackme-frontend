import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import {
  ProfileSetupSchema,
  type ProfileSetupFormData,
} from "../schemas/profileSchemas";

import api from "../services/api.service";

import { useAuth } from "../hooks/useAuth";
import { useRequireProfile } from "../hooks/useRequireProfile";

import {
  AvatarInput,
  GradientButton,
  AnimatedWrapper,
  SkipButton,
  TextAreaField,
} from "../components/index";

export default function ProfileSetup() {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { setProfile } = useAuth();
  const navigate = useNavigate();
  const profile = useRequireProfile();

  useEffect(() => {
    if (profile?.profileSetupDone) {
      navigate("/profile", { replace: true });
    }
  }, [profile, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ProfileSetupFormData>({
    resolver: zodResolver(ProfileSetupSchema),
  });

  const onSubmit = async (data: ProfileSetupFormData) => {
    if (!avatar) {
      toast.error("Por favor, selecione um avatar.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("bio", data.bio || "");
    formData.append("avatar", avatar);
    formData.append("profileSetupDone", "true");

    try {
      const response = await api.put("/profiles/me", formData);
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
    const { bio } = getValues();

    const formData = new FormData();
    formData.append("bio", bio || "");
    // avatar não será enviado
    formData.append("profileSetupDone", "true");
    try {
      const response = await api.put("/profiles/me", formData);
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
    <AnimatedWrapper className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
      <div className="bg-white rounded-lg text-center shadow-lg p-8 w-full max-w-md">
        <h2 className="text-4xl font-bold mb-6 text-blue-600">
          Complete seu perfil
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex justify-center">
            <AvatarInput
              onFileSelect={(file) => {
                setAvatar(file);
              }}
              disabled={loading}
            />
          </div>

          <TextAreaField
            placeholder="Conte um pouco sobre você..."
            {...register("bio")}
            error={errors.bio?.message}
            className="h-24"
          />

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

            <SkipButton onClick={handleSkip} disabled={loading} type="button" />
          </div>
        </form>
      </div>
    </AnimatedWrapper>
  );
}

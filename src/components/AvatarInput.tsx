import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import Avatar from "./Avatar";

type AvatarInputProps = {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
};

export default function AvatarInput({
  onFileSelect,
  disabled,
}: AvatarInputProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const resizeImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          if (!ctx) return reject("Canvas context não disponível");

          const size = 256;
          canvas.width = size;
          canvas.height = size;

          const ratio = img.width / img.height;
          let drawWidth = size * ratio;
          let drawHeight = size;
          let offsetX = -(drawWidth - size) / 2;
          let offsetY = 0;

          if (ratio < 1) {
            drawWidth = size;
            drawHeight = size / ratio;
            offsetX = 0;
            offsetY = -(drawHeight - size) / 2;
          }

          ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
          const base64 = canvas.toDataURL("image/jpeg", 0.8);
          resolve(base64);
        };

        img.onerror = reject;
        img.src = reader.result as string;
      };

      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const base64 = await resizeImage(file);
      onFileSelect(file);
      setPreview(base64);
    } catch (err) {
      console.error("Erro ao redimensionar preview:", err);
      setPreview(URL.createObjectURL(file)); // fallback
    }
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor="avatar"
        title="Clique para selecionar avatar"
        className="w-24 h-24 flex items-center justify-center rounded-full border border-gray-300 overflow-hidden cursor-pointer"
      >
        {preview ? (
          <Avatar src={preview} size={96} />
        ) : (
          <FaCamera className="text-gray-400 text-3xl" />
        )}
      </label>

      <input
        id="avatar"
        type="file"
        accept="image/jpeg,image/png"
        className="hidden"
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
}

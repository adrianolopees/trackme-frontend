import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import Avatar from "./Avatar";

import { useImageResize } from "../../hooks/useImageResize";

type AvatarInputProps = {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
};

export default function AvatarInput({
  onFileSelect,
  disabled,
}: AvatarInputProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const { resizeImage } = useImageResize();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const base64 = await resizeImage(file);
      onFileSelect(file);
      setPreview(base64);
    } catch (err) {
      console.error("Erro ao redimensionar preview:", err);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor="avatar"
        title="Clique para selecionar avatar"
        className="w-36 h-36 flex items-center justify-center rounded-full border border-gray-300 overflow-hidden cursor-pointer"
      >
        {preview ? (
          <Avatar src={preview} size={146} />
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

import { FaUser } from "react-icons/fa";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
}

export default function Avatar({
  src,
  alt = "Avatar do usuário",
  size = 80,
}: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`w-${size} h-${size} rounded-full object-cover mx-auto mb-4 shadow`}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className="bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
      style={{ width: size, height: size }}
    >
      <FaUser className="text-blue-600" style={{ fontSize: size * 0.5 }} />
    </div>
  );
}

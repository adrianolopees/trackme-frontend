import { FaUser } from "react-icons/fa";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
  className?: string;
}

export default function Avatar({
  src,
  alt = "Avatar do usuário",
  size = 80,
  className = "",
}: AvatarProps) {
  const style = { width: size, height: size };
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`rounded-full object-cover shadow ${className}`}
        style={style}
      />
    );
  }

  return (
    <div
      className="bg-blue-100 rounded-full flex items-center justify-center shadow"
      style={style}
    >
      <FaUser className="text-blue-600" style={{ fontSize: size * 0.5 }} />
    </div>
  );
}

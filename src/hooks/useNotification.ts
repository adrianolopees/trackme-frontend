import { useState, useEffect } from "react";
import { toast } from "react-toastify";

// Custom hook para media queries
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);
  return matches;
};

// Tipos para as opções
interface NotificationOptions {
  duration?: number;
  position?: "top" | "bottom" | "center";
  persistent?: boolean;
}

export const useNotification = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return {
    showSuccess: (message: string, options?: NotificationOptions) => {
      if (isMobile) {
        toast.success(message, {
          position: "bottom-center",
          autoClose: 3000,
        });
      } else {
        toast.success(message, {
          position: "top-right",
          autoClose: 4000,
        });
      }
    },
    showError: (message: string, options?: NotificationOptions) => {
      if (isMobile) {
        toast.error(message, {
          position: "bottom-center",
          autoClose: 4000,
        });
      } else {
        toast.error(message, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    },
    showWarning: (message: string, options?: NotificationOptions) => {
      console.log("Warning:", message, "Mobile:", isMobile);
    },
    showInfo: (message: string, options?: NotificationOptions) => {
      console.log("Info:", message, "Mobile:", isMobile);
    },
  };
};

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

export const useNotification = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return {
    showSuccess: (message: string) => {
      toast.success(message, {
        position: isMobile ? "bottom-center" : "top-right",
        autoClose: isMobile ? 2500 : 3500,
      });
    },
    showError: (message: string) => {
      toast.error(message, {
        position: isMobile ? "bottom-center" : "top-right",
        autoClose: isMobile ? 4000 : 5000,
      });
    },
    showWarning: (message: string) => {
      console.log("Warning:", message, "Mobile:", isMobile);
    },
    showInfo: (message: string) => {
      console.log("Info:", message, "Mobile:", isMobile);
    },
  };
};

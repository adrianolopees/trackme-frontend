import { useCallback } from "react";

export function useImageResize() {
  const resizeImage = useCallback((file: File): Promise<string> => {
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
  }, []);

  return { resizeImage };
}

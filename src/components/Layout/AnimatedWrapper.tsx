import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function AnimatedWrapper({
  children,
  className = "",
}: AnimatedWrapperProps) {
  return (
    <motion.div
      className={className} // Deixa o controle total das classes para o usuário
      initial={{ opacity: 0, y: 20 }} // Animação de entrada (de baixo para cima com fade in)
      animate={{ opacity: 1, y: 0 }} // Estado final (visível e posicionado)
      exit={{ opacity: 0, y: -20 }} // Animação de saída (para cima com fade out)
      transition={{ duration: 0.5 }} // Duração da transição (pode customizar via props se quiser mais flexibilidade)
    >
      {children}
    </motion.div>
  );
}

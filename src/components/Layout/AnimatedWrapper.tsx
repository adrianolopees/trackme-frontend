import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedWrapperProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  initialY?: number;
  exitY?: number;
  motionKey?: string | number;
}

export default function AnimatedWrapper({
  children,
  className = "",
  duration = 0.5,
  initialY = 20,
  exitY = 20,
  motionKey,
}: AnimatedWrapperProps) {
  return (
    <motion.div
      key={motionKey}
      className={className}
      initial={{ opacity: 0, y: initialY }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: exitY }}
      transition={{ duration }}
    >
      {children}
    </motion.div>
  );
}

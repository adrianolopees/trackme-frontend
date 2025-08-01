import { useContext } from "react";
import { FollowContext } from "../contexts/FollowContext";

export const useFollow = () => {
  const context = useContext(FollowContext);
  if (!context) {
    throw new Error("useFollow deve ser usado dentro de um FollowProvider");
  }
  return context;
};

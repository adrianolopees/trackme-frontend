import { useContext } from "react";
import { FollowContext } from "../contexts/FollowContext";
import type { FollowContextData } from "../types/follow.types";

export const useFollow = (): FollowContextData => {
  const context = useContext(FollowContext);
  if (!context) {
    throw new Error("useFollow deve ser usado dentro de um FollowProvider");
  }
  return context;
};

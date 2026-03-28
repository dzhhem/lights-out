import { createContext, useContext } from "react";
import type useGameLogic from "../hooks/useGameLogic";

export interface AppContextType {
  gameLogic: ReturnType<typeof useGameLogic>;
}

export const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};

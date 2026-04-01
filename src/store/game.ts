import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface GameSessionState {
  grid: boolean[];
  steps: number;
  isWon: boolean;
  isLost: boolean;
  timeLeft: number;
  initialGrid: boolean[] | null;
  activeSize: number;
  setGameState: (_state: Partial<GameSessionState>) => void;
  resetSession: () => void;
}

export const useGameStore = create<GameSessionState>()(
  persist(
    (set) => ({
      grid: [],
      steps: 0,
      isWon: false,
      isLost: false,
      timeLeft: 0,
      initialGrid: null,
      activeSize: 0,
      setGameState: (newState) => set((state) => ({ ...state, ...newState })),
      resetSession: () =>
        set({
          grid: [],
          steps: 0,
          isWon: false,
          isLost: false,
          timeLeft: 0,
          initialGrid: null,
          activeSize: 0,
        }),
    }),
    {
      name: "lights-out-session",
      storage: createJSONStorage(() => ({
        getItem: (name) => localStorage.getItem(name),
        removeItem: (name) => localStorage.removeItem(name),
        setItem: (name, value) => {
          const parsed = JSON.parse(value);
          const state = parsed.state;
          if (
            state &&
            Array.isArray(state.grid) &&
            state.grid.length > 0 &&
            state.initialGrid !== null &&
            !state.isWon &&
            !state.isLost
          ) {
            localStorage.setItem(name, value);
          } else {
            localStorage.removeItem(name);
          }
        },
      })),
    },
  ),
);

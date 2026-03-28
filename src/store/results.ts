import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

export interface GameResult {
  id: string;
  isWin: boolean;
  steps: number;
  date: string;
  size: number;
}

interface ResultsState {
  isOpen: boolean;
  isWin: boolean;
  steps: number;
  history: GameResult[];
  bestScores: Record<number, number>;
  showResults: (_result: {
    isWin: boolean;
    steps: number;
    size: number;
  }) => void;
  hideResults: () => void;
  clearHistory: () => void;
}

export const useResultsStore = create<ResultsState>()(
  persist(
    (set) => ({
      isOpen: false,
      isWin: false,
      steps: 0,
      history: [],
      bestScores: {},
      showResults: (result) =>
        set((state) => {
          const newResult: GameResult = {
            id: uuidv4(),
            isWin: result.isWin,
            steps: result.steps,
            date: new Date().toISOString(),
            size: result.size,
          };
          const nextBestScores = { ...state.bestScores };
          if (result.isWin) {
            const currentBest = state.bestScores[result.size];
            if (!currentBest || result.steps < currentBest) {
              nextBestScores[result.size] = result.steps;
            }
          }
          return {
            isOpen: true,
            isWin: result.isWin,
            steps: result.steps,
            history: [newResult, ...state.history].slice(0, 10),
            bestScores: nextBestScores,
          };
        }),
      hideResults: () => set({ isOpen: false }),
      clearHistory: () => set({ history: [], bestScores: {} }),
    }),
    {
      name: "lights-out-results",
      partialize: (state) => ({
        history: state.history,
        bestScores: state.bestScores,
      }),
    },
  ),
);

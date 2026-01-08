import { create } from "zustand";

interface ResultsState {
	isOpen: boolean;
	isWin: boolean;
	steps: number;
	showResults: (_result: { isWin: boolean; steps: number }) => void;
	hideResults: () => void;
}

export const useResultsStore = create<ResultsState>((set) => ({
	isOpen: false,
	isWin: false,
	steps: 0,
	showResults: (result) =>
		set({ isOpen: true, isWin: result.isWin, steps: result.steps }),
	hideResults: () => set({ isOpen: false }),
}));

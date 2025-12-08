import { useState, useCallback } from "react";

type Page = "start" | "game" | "results";

interface GameResult {
	steps: number;
}

const usePageState = () => {
	const [currentPage, setCurrentPage] = useState<Page>("start");
	const [lastResult, setLastResult] = useState<GameResult | null>(null);

	const goToGame = useCallback(() => {
		setCurrentPage("game");
	}, []);

	const goToResults = useCallback((steps: number) => {
		setLastResult({
			steps,
		});
		setCurrentPage("results");
	}, []);

	const goToStart = useCallback(() => {
		setCurrentPage("start");
		setLastResult(null);
	}, []);

	return {
		currentPage,
		lastResult,
		goToGame,
		goToResults,
		goToStart,
	};
};

export default usePageState;

import { useState, useEffect, useCallback } from "react";

const getNeighbors = (index: number): number[] => {
	const neighbors: number[] = [];
	const COLS = 4;
	const row = Math.floor(index / COLS);
	const col = index % COLS;

	if (row > 0) neighbors.push(index - COLS);
	if (row < 3) neighbors.push(index + COLS);
	if (col > 0) neighbors.push(index - 1);
	if (col < 3) neighbors.push(index + 1);

	return neighbors;
};

const useGameLogic = () => {
	const [grid, setGrid] = useState<boolean[]>([]);
	const [steps, setSteps] = useState(0);
	const [isWon, setIsWon] = useState(false);

	const createInitialGrid = useCallback(() => {
		const solvedGrid = Array(16).fill(false);
		const shuffleCount = Math.floor(Math.random() * 5) + 6;
		const newGrid = [...solvedGrid];

		for (let i = 0; i < shuffleCount; i++) {
			const randomIndex = Math.floor(Math.random() * 16);

			newGrid[randomIndex] = !newGrid[randomIndex];

			const neighbors = getNeighbors(randomIndex);
			neighbors.forEach((neighborIndex) => {
				newGrid[neighborIndex] = !newGrid[neighborIndex];
			});
		}

		return newGrid;
	}, []);

	useEffect(() => {
		setGrid(createInitialGrid());
	}, [createInitialGrid]);

	const initializeGrid = useCallback(() => {
		setGrid(createInitialGrid());
		setSteps(0);
		setIsWon(false);
	}, [createInitialGrid]);

	const handleCellClick = useCallback((index: number) => {
		setGrid((prevGrid) => {
			const newGrid = [...prevGrid];
			newGrid[index] = !newGrid[index];

			const neighbors = getNeighbors(index);
			neighbors.forEach((neighborIndex) => {
				newGrid[neighborIndex] = !newGrid[neighborIndex];
			});

			const allOff = newGrid.every((cell) => !cell);
			if (allOff) {
				setIsWon(true);
			}

			return newGrid;
		});

		setSteps((prev) => prev + 1);
	}, []);

	const resetGame = useCallback(() => {
		initializeGrid();
	}, [initializeGrid]);

	return {
		grid,
		steps,
		isWon,
		handleCellClick,
		resetGame,
	};
};

export default useGameLogic;

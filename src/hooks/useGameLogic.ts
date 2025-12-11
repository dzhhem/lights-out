import { useState, useEffect, useCallback, useRef } from "react";

const useGameLogic = (size = 4, timer = 0) => {
	const COLS = size;

	const getNeighbors = useCallback(
		(index: number): number[] => {
			const neighbors: number[] = [];
			const row = Math.floor(index / COLS);
			const col = index % COLS;

			if (row > 0) neighbors.push(index - COLS);
			if (row < COLS - 1) neighbors.push(index + COLS);
			if (col > 0) neighbors.push(index - 1);
			if (col < COLS - 1) neighbors.push(index + 1);

			return neighbors;
		},
		[COLS],
	);

	const [grid, setGrid] = useState<boolean[]>([]);
	const [steps, setSteps] = useState(0);
	const [isWon, setIsWon] = useState(false);
	const [isLost, setIsLost] = useState(false);
	const [timeLeft, setTimeLeft] = useState(timer);

	const initialGridRef = useRef<boolean[] | null>(null);

	const createRandomGrid = useCallback(() => {
		const len = size * size;

		const applyClick = (grid: boolean[], index: number) => {
			grid[index] = !grid[index];
			const neighbors = getNeighbors(index);
			neighbors.forEach((n) => {
				grid[n] = !grid[n];
			});
		};

		const newGrid = Array(len).fill(false);

		const minClicks = Math.max(3, Math.floor(size * 1.5));
		const maxClicks = size * size - 1;
		const shuffleCount =
			Math.floor(Math.random() * (maxClicks - minClicks + 1)) + minClicks;

		const clickCounts = Array(len).fill(0);

		for (let i = 0; i < shuffleCount; i++) {
			const randomIndex = Math.floor(Math.random() * len);
			clickCounts[randomIndex]++;
		}

		for (let i = 0; i < len; i++) {
			if (clickCounts[i] % 2 === 1) {
				applyClick(newGrid, i);
			}
		}

		if (newGrid.every((cell) => !cell)) {
			const forcedIndex = Math.floor(Math.random() * len);
			applyClick(newGrid, forcedIndex);
		}

		return newGrid;
	}, [getNeighbors, size]);

	const startNewGame = useCallback(() => {
		const g = createRandomGrid();
		initialGridRef.current = [...g];
		setGrid(g);
		setSteps(0);
		setIsWon(false);
		setIsLost(false);
		setTimeLeft(timer);
	}, [createRandomGrid, timer]);

	const restartToInitial = useCallback(() => {
		if (!initialGridRef.current) return;
		setGrid([...initialGridRef.current]);
		setSteps(0);
		setIsWon(false);
		setIsLost(false);
		setTimeLeft(timer);
	}, [timer]);

	useEffect(() => {
		startNewGame();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [size, timer]);

	useEffect(() => {
		if (timer === 0 || isWon || isLost) return;

		if (timeLeft <= 0) {
			setIsLost(true);
			return;
		}

		const interval = setInterval(() => {
			setTimeLeft((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [timer, timeLeft, isWon, isLost]);

	const handleCellClick = useCallback(
		(index: number) => {
			if (isWon || isLost) return;

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
		},
		[getNeighbors, isWon, isLost],
	);

	return {
		grid,
		steps,
		isWon,
		isLost,
		timeLeft,
		handleCellClick,
		startNewGame,
		restartToInitial,
	};
};

export default useGameLogic;

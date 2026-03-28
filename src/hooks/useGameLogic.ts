import { useEffect, useCallback, useRef } from "react";
import { useGameStore } from "../store/game";

const useGameLogic = (size = 4, timer = 0) => {
  const COLS = size;
  const {
    grid,
    steps,
    isWon,
    isLost,
    timeLeft,
    initialGrid,
    activeSize,
    setGameState,
  } = useGameStore();

  const initialGridRef = useRef<boolean[] | null>(initialGrid);

  useEffect(() => {
    initialGridRef.current = initialGrid;
  }, [initialGrid]);

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
    setGameState({
      grid: g,
      initialGrid: [...g],
      steps: 0,
      isWon: false,
      isLost: false,
      timeLeft: timer,
      activeSize: size,
    });
  }, [createRandomGrid, timer, size, setGameState]);

  const restartToInitial = useCallback(() => {
    if (!initialGridRef.current) return;
    setGameState({
      grid: [...initialGridRef.current],
      steps: 0,
      isWon: false,
      isLost: false,
      timeLeft: timer,
    });
  }, [timer, setGameState]);

  useEffect(() => {
    if (grid.length === 0 || activeSize !== size) {
      startNewGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size, startNewGame]);

  useEffect(() => {
    if (timer === 0 || isWon || isLost) return;

    if (timeLeft <= 0) {
      setGameState({ isLost: true });
      return;
    }

    const interval = setInterval(() => {
      setGameState({ timeLeft: timeLeft - 1 });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, timeLeft, isWon, isLost, setGameState]);

  const handleCellClick = useCallback(
    (index: number) => {
      if (isWon || isLost) return;

      const newGrid = [...grid];
      newGrid[index] = !newGrid[index];
      const neighbors = getNeighbors(index);
      neighbors.forEach((neighborIndex) => {
        newGrid[neighborIndex] = !newGrid[neighborIndex];
      });

      const allOff = newGrid.every((cell) => !cell);

      setGameState({
        grid: newGrid,
        steps: steps + 1,
        isWon: allOff,
      });
    },
    [getNeighbors, isWon, isLost, grid, steps, setGameState],
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

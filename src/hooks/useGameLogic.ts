import { useEffect, useCallback, useRef } from "react";
import { useGameStore } from "../store/game";
import { useResultsStore } from "../store/results";

const useGameLogic = (size = 4, timer = 60) => {
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

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    localStorage.removeItem("lights-out-session");
  }, []);

  const createTimerInterval = useCallback(() => {
    if (timer === 0) return;
    intervalRef.current = setInterval(() => {
      const state = useGameStore.getState();
      if (state.isWon || state.isLost) {
        stopTimer();
        return;
      }
      if (state.timeLeft <= 0) {
        setGameState({ isLost: true });
        stopTimer();
        return;
      }
      setGameState({ timeLeft: state.timeLeft - 1 });
    }, 1000);
  }, [timer, setGameState, stopTimer]);

  const startNewGame = useCallback(() => {
    stopTimer();
    useResultsStore.getState().hideResults();
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
    createTimerInterval();
  }, [
    createRandomGrid,
    timer,
    size,
    setGameState,
    stopTimer,
    createTimerInterval,
  ]);

  const restartToInitial = useCallback(() => {
    if (!initialGridRef.current) return;
    stopTimer();
    setGameState({
      grid: [...initialGridRef.current],
      steps: 0,
      isWon: false,
      isLost: false,
      timeLeft: timer,
    });
    createTimerInterval();
  }, [timer, setGameState, stopTimer, createTimerInterval]);

  useEffect(() => {
    if (grid.length > 0 && activeSize !== size) {
      startNewGame();
    }
  }, [size, activeSize, grid.length, startNewGame]);

  useEffect(() => {
    if (grid.length > 0 && !isWon && !isLost) {
      createTimerInterval();
    }
    return () => stopTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const giveUp = useCallback(() => {
    stopTimer();
    setGameState({ isLost: true });
  }, [stopTimer, setGameState]);

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

      if (allOff) {
        stopTimer();
      }
    },
    [getNeighbors, isWon, isLost, grid, steps, setGameState, stopTimer],
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
    stopTimer,
    giveUp,
  };
};

export default useGameLogic;

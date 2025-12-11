import { useEffect } from "react";
import Button from "../components/ui/Button";
import ContainerLayout from "../layouts/ContainerLayout";
import GameGrid from "../components/game/GameGrid";
import StepCounter from "../components/game/StepCounter";
import Timer from "../components/game/Timer";
import type useGameLogic from "../hooks/useGameLogic";

interface GamePageProps {
	gameLogic: ReturnType<typeof useGameLogic>;
	timerEnabled: boolean;
	onGameWon: () => void;
	onGameLost: () => void;
}

const GamePage = ({
	gameLogic,
	timerEnabled,
	onGameWon,
	onGameLost,
}: GamePageProps) => {
	useEffect(() => {
		if (gameLogic.isWon) {
			onGameWon();
		}
	}, [gameLogic.isWon, onGameWon]);

	useEffect(() => {
		if (gameLogic.isLost) {
			onGameLost();
		}
	}, [gameLogic.isLost, onGameLost]);

	return (
		<ContainerLayout className="bg-gray-100">
			<h1 className="text-3xl font-bold mb-4">Game</h1>

			<div className="flex gap-6 mb-3 items-center justify-center">
				<StepCounter steps={gameLogic.steps} />
				{timerEnabled && <Timer timeLeft={gameLogic.timeLeft} />}
			</div>

			<GameGrid
				grid={gameLogic.grid}
				onCellClick={gameLogic.handleCellClick}
			/>
			<div className="mt-6 flex gap-4">
				<Button onClick={gameLogic.startNewGame}>New Game</Button>
				<Button onClick={onGameLost} variant="secondary">
					Give Up
				</Button>
			</div>
		</ContainerLayout>
	);
};

export default GamePage;

import { useEffect } from "react";
import Button from "../components/ui/Button";
import ContainerLayout from "../layouts/ContainerLayout";
import GameGrid from "../components/game/GameGrid";
import StepCounter from "../components/game/StepCounter";
import type useGameLogic from "../hooks/useGameLogic";

interface GamePageProps {
	gameLogic: ReturnType<typeof useGameLogic>;
	onGameWon: () => void;
	onGameLost: () => void;
}

const GamePage = ({ gameLogic, onGameWon, onGameLost }: GamePageProps) => {
	useEffect(() => {
		if (gameLogic.isWon && gameLogic.grid.every((cell) => !cell)) {
			onGameWon();
		}
	}, [gameLogic.isWon, gameLogic.grid, onGameWon]);

	return (
		<ContainerLayout className="bg-gray-100">
			<h1 className="text-3xl font-bold mb-4">Game</h1>
			<StepCounter steps={gameLogic.steps} />
			<GameGrid
				grid={gameLogic.grid}
				onCellClick={gameLogic.handleCellClick}
			/>
			<div className="mt-6 flex gap-4">
				<Button onClick={gameLogic.resetGame}>New Game</Button>
				<Button onClick={onGameLost} variant="secondary">
					Give Up
				</Button>
			</div>
		</ContainerLayout>
	);
};

export default GamePage;

import { useEffect } from "react";
import { useParams } from "react-router";
import Button from "../components/ui/Button";
import ContainerLayout from "../layouts/ContainerLayout";
import GameGrid from "../components/game/GameGrid";
import StepCounter from "../components/game/StepCounter";
import Timer from "../components/game/Timer";
import { useAppContext } from "../context/AppContext";
import { useSettingsStore } from "../store/settings";
import { useResultsStore } from "../store/results";

const GamePage = () => {
	const { userId } = useParams<{ userId: string }>();
	const { gameLogic } = useAppContext();
	const settings = useSettingsStore((state) => state.settings);
	const showResults = useResultsStore((state) => state.showResults);

	useEffect(() => {
		if (gameLogic.isWon) {
			showResults({
				isWin: true,
				steps: gameLogic.steps,
				size: settings.size,
			});
		}
	}, [gameLogic.isWon, gameLogic.steps, showResults, settings.size]);

	useEffect(() => {
		if (gameLogic.isLost) {
			showResults({
				isWin: false,
				steps: gameLogic.steps,
				size: settings.size,
			});
		}
	}, [gameLogic.isLost, gameLogic.steps, showResults, settings.size]);

	const handleGiveUp = () => {
		showResults({
			isWin: false,
			steps: gameLogic.steps,
			size: settings.size,
		});
	};

	return (
		<ContainerLayout className="bg-gray-100">
			<span className="text-sm text-gray-500 mb-2">
				Player: {userId?.slice(0, 8)}...
			</span>

			<h1 className="text-3xl font-bold mb-4">Game</h1>

			<div className="flex gap-6 mb-3 items-center justify-center">
				<StepCounter steps={gameLogic.steps} />
				{settings.timer > 0 && <Timer timeLeft={gameLogic.timeLeft} />}
			</div>

			<GameGrid
				grid={gameLogic.grid}
				onCellClick={gameLogic.handleCellClick}
			/>
			<div className="mt-6 flex gap-4">
				<Button onClick={gameLogic.startNewGame}>New Game</Button>
				<Button onClick={handleGiveUp} variant="secondary">
					Give Up
				</Button>
			</div>
		</ContainerLayout>
	);
};

export default GamePage;

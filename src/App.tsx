import usePageState from "./hooks/usePageState";
import useGameLogic from "./hooks/useGameLogic";
import useSettings from "./hooks/useSettings";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import SettingsModal from "./components/ui/SettingsModal";
import ResultsModal from "./components/ui/ResultsModal";
import { useState } from "react";

const App = () => {
	const { currentPage, goToGame, goToStart } = usePageState();

	const { settings, update: updateSettings } = useSettings();

	const [showSettings, setShowSettings] = useState(false);
	const [showResultsModal, setShowResultsModal] = useState(false);
	const [didWin, setDidWin] = useState(false);

	const gameLogic = useGameLogic(settings.size, settings.timer);

	const handleStartGame = () => {
		gameLogic.startNewGame();
		goToGame();
	};

	const handleGameWon = () => {
		setDidWin(true);
		setShowResultsModal(true);
	};

	const handleGameLost = () => {
		setDidWin(false);
		setShowResultsModal(true);
	};

	return (
		<>
			{currentPage === "start" && (
				<StartPage
					onStart={handleStartGame}
					onOpenSettings={() => setShowSettings(true)}
				/>
			)}
			{currentPage === "game" && (
				<GamePage
					gameLogic={gameLogic}
					timerEnabled={settings.timer > 0}
					onGameWon={handleGameWon}
					onGameLost={handleGameLost}
				/>
			)}

			{showSettings && (
				<SettingsModal
					defaultSettings={settings}
					onClose={() => setShowSettings(false)}
					onSave={(s) => updateSettings(s)}
				/>
			)}

			{showResultsModal && (
				<ResultsModal
					isWin={didWin}
					steps={gameLogic.steps}
					onClose={() => setShowResultsModal(false)}
					onNextRound={() => gameLogic.startNewGame()}
					onRestartToInitial={() => gameLogic.restartToInitial()}
					onGoToStart={() => {
						setShowResultsModal(false);
						goToStart();
					}}
				/>
			)}
		</>
	);
};

export default App;

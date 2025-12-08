import usePageState from "./hooks/usePageState";
import useGameLogic from "./hooks/useGameLogic";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import ResultsPage from "./pages/ResultsPage";

const App = () => {
	const { currentPage, lastResult, goToGame, goToResults, goToStart } =
		usePageState();

	const gameLogic = useGameLogic();

	const handleStartGame = () => {
		gameLogic.resetGame();
		goToGame();
	};

	const handleRestart = () => {
		gameLogic.resetGame();
		goToStart();
	};

	return (
		<>
			{currentPage === "start" && <StartPage onStart={handleStartGame} />}
			{currentPage === "game" && (
				<GamePage
					gameLogic={gameLogic}
					onGameWon={() => goToResults(gameLogic.steps)}
					onGameLost={() => goToResults(gameLogic.steps)}
				/>
			)}
			{currentPage === "results" && lastResult && (
				<ResultsPage
					onRestart={handleRestart}
					steps={lastResult.steps}
				/>
			)}
		</>
	);
};

export default App;

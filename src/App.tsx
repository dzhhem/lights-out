import { Outlet } from "react-router";
import useGameLogic from "./hooks/useGameLogic";
import SettingsModal from "./components/ui/SettingsModal";
import ResultsModal from "./components/ui/ResultsModal";
import { AppContext, type AppContextType } from "./context/AppContext";
import { useSettingsStore } from "./store/settings";
import { useResultsStore } from "./store/results";

const App = () => {
	const settings = useSettingsStore((state) => state.settings);
	const isSettingsOpen = useSettingsStore((state) => state.isSettingsOpen);
	const closeSettings = useSettingsStore((state) => state.closeSettings);
	const showResultsModal = useResultsStore((state) => state.isOpen);
	const gameLogic = useGameLogic(settings.size, settings.timer);

	const contextValue: AppContextType = {
		gameLogic,
	};

	return (
		<AppContext.Provider value={contextValue}>
			<Outlet />

			{isSettingsOpen && <SettingsModal onClose={closeSettings} />}

			{showResultsModal && (
				<ResultsModal
					onNextRound={() => gameLogic.startNewGame()}
					onRestartToInitial={() => gameLogic.restartToInitial()}
				/>
			)}
		</AppContext.Provider>
	);
};

export default App;

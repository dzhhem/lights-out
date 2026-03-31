import { useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";
import Button from "../components/ui/Button";
import ContainerLayout from "../layouts/ContainerLayout";
import { useAppContext } from "../context/AppContext";
import { useSettingsStore } from "../store/settings";
import { useResultsStore } from "../store/results";

const StartPage = () => {
  const navigate = useNavigate();
  const { gameLogic } = useAppContext();
  const openSettings = useSettingsStore((state) => state.openSettings);
  const history = useResultsStore((state) => state.history);
  const bestScores = useResultsStore((state) => state.bestScores);
  const clearHistory = useResultsStore((state) => state.clearHistory);
  const settings = useSettingsStore((state) => state.settings);

  const bestScore = bestScores[settings.size];

  const handleStartGame = () => {
    const userId = uuidv4();
    gameLogic.startNewGame();
    navigate(`/game/${userId}`);
  };

  return (
    <ContainerLayout className="justify-center p-4">
      <div className="relative w-full max-w-2xl flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-6 text-center dark:text-white">
          Lights{" "}
          <span className="text-yellow-600 dark:text-yellow-400">Out</span>
        </h1>
        <p className="text-lg mb-4 text-gray-600 dark:text-slate-400 text-center">
          Turn off all the lights with the minimum number of steps
        </p>

        {bestScore && (
          <div className="mb-6 text-center">
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">
              Best score for {settings.size}x{settings.size}:{" "}
              <span className="text-lg font-bold">{bestScore} steps</span>
            </p>
          </div>
        )}

        <div className="flex gap-4 justify-center">
          <Button onClick={handleStartGame}>Start Game</Button>
          <Button onClick={openSettings} variant="secondary">
            Settings
          </Button>
        </div>

        {history.length > 0 && (
          <div className="absolute top-full left-0 w-full mt-10 pb-20 transform-gpu translate-z-0">
            <div className="w-full max-w-md mx-auto">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold dark:text-white">
                    Recent Activity
                  </h2>
                  <button
                    onClick={clearHistory}
                    className="text-xs text-red-500 hover:text-red-700 font-medium cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-3">
                  {history.map((game) => (
                    <div
                      key={game.id}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-md border border-gray-100 dark:border-slate-700"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            game.isWin ? "bg-green-500" : "bg-red-500"
                          }`}
                        />
                        <span
                          className={`font-medium text-sm ${
                            game.isWin
                              ? "text-green-700 dark:text-green-400"
                              : "text-red-700 dark:text-red-400"
                          }`}
                        >
                          {game.isWin ? "WIN" : "LOSS"}
                        </span>
                      </div>

                      <div className="grid grid-cols-[auto_auto_1fr] items-end gap-4 text-sm">
                        <span className="text-gray-600 dark:text-slate-300">
                          Size:{" "}
                          <span className="font-bold w-12 inline-block">
                            {game.size}x{game.size}
                          </span>
                        </span>
                        <span className="text-gray-600 dark:text-slate-300">
                          Steps:{" "}
                          <span className="font-bold w-8 inline-block">
                            {game.steps}
                          </span>
                        </span>
                        <span className="text-gray-400 dark:text-slate-500 text-xs">
                          {new Date(game.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ContainerLayout>
  );
};

export default StartPage;

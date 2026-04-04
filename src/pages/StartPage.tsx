import React from "react";
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

                <div className="grid gap-y-3 grid-cols-[auto_max-content_max-content_auto] max-[426px]:grid-cols-[auto_max-content_max-content]">
                  {history.map((game) => (
                    <React.Fragment key={game.id}>
                      <div className="flex items-center pr-2 gap-2 shrink-0 pl-3 py-3 bg-gray-50 dark:bg-slate-700/50 rounded-l-md border-y border-l border-gray-100 dark:border-slate-700 text-sm">
                        <div
                          className={`w-2 h-2 rounded-full ${game.isWin ? "bg-green-500" : "bg-red-500"}`}
                        />
                        <span
                          className={`font-medium ${game.isWin ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}`}
                        >
                          {game.isWin ? "WIN" : "LOSS"}
                        </span>
                      </div>

                      <div className="flex items-center px-2 py-3 bg-gray-50 dark:bg-slate-700/50 border-y border-gray-100 dark:border-slate-700 text-sm text-gray-600 dark:text-slate-300">
                        Size:{" "}
                        <span className="font-bold ml-1">
                          {game.size}x{game.size}
                        </span>
                      </div>

                      <div className="flex items-center px-2 py-3 bg-gray-50 dark:bg-slate-700/50 border-y border-gray-100 dark:border-slate-700 text-sm text-gray-600 dark:text-slate-300 max-[426px]:rounded-r-md max-[426px]:border-r max-[426px]:pr-3">
                        Steps:{" "}
                        <span className="font-bold ml-1">{game.steps}</span>
                      </div>

                      <div className="flex items-center justify-end pr-3 py-3 bg-gray-50 dark:bg-slate-700/50 rounded-r-md border-y border-r border-gray-100 dark:border-slate-700 text-xs text-gray-400 dark:text-slate-500 max-[426px]:hidden">
                        {new Date(game.date).toLocaleDateString()}
                      </div>
                    </React.Fragment>
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

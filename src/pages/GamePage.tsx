import { useEffect } from "react";
import { useBlocker, useNavigate, useParams } from "react-router";
import Button from "../components/ui/Button";
import ContainerLayout from "../layouts/ContainerLayout";
import GameGrid from "../components/game/GameGrid";
import StepCounter from "../components/game/StepCounter";
import Timer from "../components/game/Timer";
import { useAppContext } from "../context/AppContext";
import { useSettingsStore } from "../store/settings";

const GamePage = () => {
  const { userId } = useParams<{ userId: string }>();
  const { gameLogic } = useAppContext();
  const settings = useSettingsStore((state) => state.settings);

  const navigate = useNavigate();

  useEffect(() => {
    if (gameLogic.grid.length === 0) {
      navigate("/", { replace: true });
    }
  }, [gameLogic.grid.length, navigate]);

  useBlocker(({ nextLocation }) => nextLocation.pathname !== "/");

  return (
    <ContainerLayout className="bg-gray-100 dark:bg-slate-900 transition-colors duration-300 p-4 justify-center">
      <span className="text-sm text-gray-500 dark:text-slate-400 mb-3">
        Player: {userId?.slice(0, 8)}...
      </span>

      <div className="flex gap-8 mb-5 items-center justify-center bg-white dark:bg-slate-800 px-4 py-2 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 transition-colors">
        <div className="flex flex-col items-center">
          <StepCounter steps={gameLogic.steps} />
        </div>
        {settings.timer > 0 && (
          <div className="flex flex-col items-center">
            <Timer timeLeft={gameLogic.timeLeft} />
          </div>
        )}
      </div>

      <div className="w-full max-w-lg bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl mb-4 border border-gray-100 dark:border-slate-700 transition-colors flex justify-center">
        <GameGrid
          grid={gameLogic.grid}
          onCellClick={gameLogic.handleCellClick}
        />
      </div>

      <div className="flex gap-4">
        <Button onClick={gameLogic.startNewGame}>New Game</Button>
        <Button onClick={gameLogic.giveUp} variant="secondary">
          Give Up
        </Button>
      </div>
    </ContainerLayout>
  );
};

export default GamePage;

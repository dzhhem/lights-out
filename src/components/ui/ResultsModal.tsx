import { useNavigate } from "react-router";
import Portal from "./Portal";
import Button from "./Button";
import { useResultsStore } from "../../store/results";

type ResultsModalProps = {
  onNextRound: () => void;
  onRestartToInitial: () => void;
};

const ResultsModal = ({
  onNextRound,
  onRestartToInitial,
}: ResultsModalProps) => {
  const navigate = useNavigate();
  const isWin = useResultsStore((state) => state.isWin);
  const steps = useResultsStore((state) => state.steps);
  const hideResults = useResultsStore((state) => state.hideResults);

  const handleMainMenu = () => {
    hideResults();
    navigate("/", { replace: true });
  };

  return (
    <Portal>
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-md">
        <div className="bg-white dark:bg-slate-800 dark:text-slate-100 p-8 rounded-2xl shadow-2xl w-full max-w-md text-center transform transition-all border border-gray-100 dark:border-slate-700">
          <h2
            className={`text-4xl font-black mb-6 ${isWin ? "text-green-500" : "text-red-500"}`}
          >
            {isWin ? "🎉 You Won!" : "😞 You Lost"}
          </h2>

          <p className="mb-10 text-xl font-medium">
            Steps taken:{" "}
            <span className="font-bold text-blue-500 dark:text-blue-400">
              {steps}
            </span>
          </p>

          <div className="flex flex-col gap-3 justify-center">
            <Button
              className="w-full py-4 text-lg"
              onClick={() => {
                onNextRound();
                hideResults();
              }}
            >
              Next Round
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="secondary"
                className="py-3"
                onClick={() => {
                  onRestartToInitial();
                  hideResults();
                }}
              >
                Restart
              </Button>
              <Button
                variant="secondary"
                className="py-3"
                onClick={handleMainMenu}
              >
                Main Menu
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default ResultsModal;

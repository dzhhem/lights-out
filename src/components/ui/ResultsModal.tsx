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
    navigate("/");
  };

  return (
    <Portal>
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-md text-center">
          <h2
            className={`text-2xl font-bold mb-4 ${
              isWin ? "text-green-600" : "text-red-600"
            }`}
          >
            {isWin ? "🎉 You Won!" : "😞 You Lost"}
          </h2>

          <p className="mb-4">
            Steps taken:{" "}
            <span className="font-bold text-blue-600">{steps}</span>
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
            <div className="w-full sm:w-auto">
              <Button
                onClick={() => {
                  onNextRound();
                  hideResults();
                }}
              >
                Next Round
              </Button>
            </div>
            <div className="w-full sm:w-auto">
              <Button
                variant="secondary"
                onClick={() => {
                  onRestartToInitial();
                  hideResults();
                }}
              >
                Restart
              </Button>
            </div>
            <div className="w-full sm:w-auto">
              <Button variant="secondary" onClick={handleMainMenu}>
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

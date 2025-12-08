import Button from "../components/ui/Button";
import ContainerLayout from "../layouts/ContainerLayout";

interface ResultsPageProps {
	onRestart: () => void;
	steps: number;
}

const ResultsPage = ({ onRestart, steps }: ResultsPageProps) => {
	return (
		<ContainerLayout>
			<h1 className="text-4xl font-bold mb-6">Game Over!</h1>
			<div className="bg-white p-8 rounded-lg shadow-lg mb-8 text-center">
				<p className="text-2xl mb-4">
					Steps taken:{" "}
					<span className="font-bold text-blue-600">{steps}</span>
				</p>
			</div>
			<Button onClick={onRestart}>Play Again</Button>
		</ContainerLayout>
	);
};

export default ResultsPage;

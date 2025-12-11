import Button from "../components/ui/Button";
import ContainerLayout from "../layouts/ContainerLayout";

interface StartPageProps {
	onStart: () => void;
	onOpenSettings?: () => void;
}

const StartPage = ({ onStart, onOpenSettings }: StartPageProps) => {
	return (
		<ContainerLayout>
			<h1 className="text-4xl font-bold mb-6">Lights Out</h1>
			<p className="text-lg mb-8 text-gray-600">
				Turn off all the lights with the minimum number of steps
			</p>
			<div className="flex gap-3">
				<Button onClick={onStart}>Start Game</Button>
				<Button onClick={onOpenSettings} variant="secondary">
					Settings
				</Button>
			</div>
		</ContainerLayout>
	);
};

export default StartPage;

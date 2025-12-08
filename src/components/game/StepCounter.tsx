interface StepCounterProps {
	steps: number;
}

const StepCounter = ({ steps }: StepCounterProps) => {
	return (
		<div className="mb-6">
			<p className="text-lg">
				Steps: <span className="font-bold">{steps}</span>
			</p>
		</div>
	);
};

export default StepCounter;

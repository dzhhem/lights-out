interface StepCounterProps {
	steps: number;
}

const StepCounter = ({ steps }: StepCounterProps) => {
	return (
		<p className="text-lg">
			Steps: <span className="font-bold">{steps}</span>
		</p>
	);
};

export default StepCounter;

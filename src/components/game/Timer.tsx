type TimerProps = {
	timeLeft: number;
};

const Timer = ({ timeLeft }: TimerProps) => {
	const colorClass = timeLeft <= 10 ? "text-red-600" : "text-green-600";

	return (
		<span className="text-lg font-medium">
			Time left:{" "}
			<span className={`font-bold ${colorClass}`}>{timeLeft}s</span>
		</span>
	);
};

export default Timer;

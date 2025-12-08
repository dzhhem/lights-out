import Cell from "./Cell";

interface GameGridProps {
	grid: boolean[];
	onCellClick: (_index: number) => void;
}

const GameGrid = ({ grid, onCellClick }: GameGridProps) => {
	return (
		<div className="bg-white p-8 rounded-lg shadow-lg">
			<div className="grid grid-cols-4 gap-2">
				{grid.map((isOn, i) => (
					<Cell key={i} onClick={() => onCellClick(i)} isOn={isOn} />
				))}
			</div>
		</div>
	);
};

export default GameGrid;

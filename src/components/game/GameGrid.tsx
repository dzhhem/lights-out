import Cell from "./Cell";

interface GameGridProps {
  grid: boolean[];
  onCellClick: (_index: number) => void;
}

const GameGrid = ({ grid, onCellClick }: GameGridProps) => {
  const size = Math.sqrt(grid.length);

  return (
    <div className="w-full max-w-[min(85vw,500px)] mx-auto">
      <div
        className="grid gap-1.5"
        style={{
          gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
        }}
      >
        {grid.map((isOn, i) => (
          <Cell key={i} onClick={() => onCellClick(i)} isOn={isOn} />
        ))}
      </div>
    </div>
  );
};

export default GameGrid;

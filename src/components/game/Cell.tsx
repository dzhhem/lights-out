interface CellProps {
  onClick: () => void;
  isOn?: boolean;
}

const Cell = ({ onClick, isOn }: CellProps) => {
  return (
    <button
      onClick={onClick}
      className={`
    w-full aspect-square border-2 rounded transition-colors duration-150
    ${
      isOn
        ? "bg-yellow-400 border-yellow-600 hover:bg-yellow-300 shadow-[0_0_10px_rgba(250,204,21,0.5)]"
        : "bg-gray-700 border-gray-600 hover:bg-gray-600"
    }
  `}
    />
  );
};

export default Cell;

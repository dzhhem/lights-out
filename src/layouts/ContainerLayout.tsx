interface ContainerLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const ContainerLayout = ({
  children,
  className = "",
}: ContainerLayoutProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 ${className}`}
    >
      {children}
    </div>
  );
};

export default ContainerLayout;

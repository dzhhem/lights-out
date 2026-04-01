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
      className={`flex flex-col items-center min-h-screen bg-gray-50 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300 ${className}`}
    >
      {children}
    </div>
  );
};

export default ContainerLayout;

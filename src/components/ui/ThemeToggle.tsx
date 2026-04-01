import { useThemeStore } from "../../store/theme";

const ThemeToggle = () => {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-[16px] right-[16px] p-3 rounded-full bg-white dark:bg-slate-800 shadow-lg border border-gray-200 dark:border-slate-700 cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300 z-60 group"
      aria-label="Toggle theme"
    >
      {" "}
      <div className="relative w-6 h-6 overflow-hidden">
        {/* Sun Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`absolute inset-0 text-yellow-500 transition-all duration-500 transform ${
            theme === "dark"
              ? "translate-y-10 opacity-0 rotate-90"
              : "translate-y-0 opacity-100 rotate-0"
          }`}
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="M4.93 4.93l1.41 1.41" />
          <path d="M17.66 17.66l1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="M4.93 19.07l1.41-1.41" />
          <path d="M17.66 6.34l1.41-1.41" />
        </svg>

        {/* Moon Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`absolute inset-0 text-indigo-400 transition-all duration-500 transform ${
            theme === "light"
              ? "-translate-y-10 opacity-0 -rotate-90"
              : "-translate-y-0 opacity-100 rotate-0"
          }`}
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </div>
    </button>
  );
};

export default ThemeToggle;

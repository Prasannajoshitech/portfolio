import { FiMoon, FiSun } from "react-icons/fi";
import useThemeSwitcher from "../../hooks/useThemeSwitcher";

type ThemeToggleProps = {
  className?: string;
};

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const [theme, toggleTheme] = useThemeSwitcher();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className={`rounded-lg p-2 text-muted transition hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${className}`}
    >
      {theme === "dark" ? (
        <FiSun className="h-5 w-5" aria-hidden />
      ) : (
        <FiMoon className="h-5 w-5" aria-hidden />
      )}
    </button>
  );
}

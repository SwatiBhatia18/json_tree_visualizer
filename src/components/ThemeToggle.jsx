import { useTheme } from "../contexts/ThemeContext"

function ThemeToggle() {
  const { theme, toggleTheme, isLight } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-btn"
      title={`Switch to ${isLight ? "dark" : "light"} mode`}
    >
      {isLight ? "🌙" : "☀️"}
      <span className="theme-toggle-text">{isLight ? "Dark" : "Light"}</span>
    </button>
  )
}

export default ThemeToggle

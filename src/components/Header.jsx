import SearchBar from "./SearchBar"
import ThemeToggle from "./ThemeToggle"

function Header({ onLayoutChange }) {
  return (
    <div className="header">
      <SearchBar />
      <ThemeToggle />
    </div>
  )
}

export default Header

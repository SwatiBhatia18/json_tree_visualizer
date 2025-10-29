import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import {
  setSearchTerm,
  setHighlightedNodes,
  setFocusNodeId,
} from "../redux/slices/jsonVisualizerSlice"

function SearchBar() {
  const dispatch = useAppDispatch()
  const nodes = useAppSelector((state) => state.jsonVisualizer.nodes)
  const searchTerm = useAppSelector((state) => state.jsonVisualizer.searchTerm)
  const highlightedNodes = useAppSelector(
    (state) => state.jsonVisualizer.highlightedNodes
  )
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || "")

  // Function to check if a node matches a JSON path
  const matchesJsonPath = (node, pathQuery) => {
    const nodePath = node.data.path
    if (!nodePath) return false

    // Normalize both paths for comparison
    const normalizeQuery = pathQuery.replace(/^\$\.?/, "").toLowerCase()
    const normalizedNodePath = nodePath.replace(/^\$\.?/, "").toLowerCase()

    // Direct path match
    if (normalizedNodePath === normalizeQuery) return true

    // Check if the query path is a parent of this node's path
    if (
      normalizedNodePath.startsWith(normalizeQuery + ".") ||
      normalizedNodePath.startsWith(normalizeQuery + "[")
    )
      return true

    // Check if this node's path contains the query path
    if (normalizedNodePath.includes(normalizeQuery)) return true

    return false
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const term = localSearchTerm.trim()
    dispatch(setSearchTerm(term))

    if (!term) {
      dispatch(setHighlightedNodes([]))
      return
    }

    // Check if this looks like a JSON path (starts with $ or contains dots/brackets)
    const isJsonPath =
      term.startsWith("$") || term.includes(".") || term.includes("[")

    const matchingNodes = nodes.filter((node) => {
      const label = node.data.label

      // If it looks like a JSON path, try path matching first
      if (isJsonPath) {
        const pathMatch = matchesJsonPath(node, term)
        if (pathMatch) return true
      }

      // Content-based search (existing functionality)
      let contentMatch = false
      const searchTerm = term.toLowerCase()

      if (typeof label === "string") {
        contentMatch = label.toLowerCase().includes(searchTerm)
      } else if (typeof label === "object") {
        contentMatch = Object.entries(label).some(
          ([key, value]) =>
            key.toLowerCase().includes(searchTerm) ||
            String(value).toLowerCase().includes(searchTerm)
        )
      }

      // Simple key matching
      let keyMatch = false
      if (typeof label === "object") {
        const keys = Object.keys(label)
        keyMatch = keys.some((key) => key.toLowerCase().includes(searchTerm))
      } else if (typeof label === "string") {
        // Check if the label itself matches part of the search term
        keyMatch = searchTerm.includes(label.toLowerCase())
      }

      return contentMatch || keyMatch
    })

    const highlightedIds = matchingNodes.map((node) => node.id)
    dispatch(setHighlightedNodes(highlightedIds))

    // Focus on the first matching node
    if (highlightedIds.length > 0) {
      dispatch(setFocusNodeId(highlightedIds[0]))
    }
  }

  const clearSearch = () => {
    setLocalSearchTerm("")
    dispatch(setSearchTerm(""))
    dispatch(setHighlightedNodes([]))
  }

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search nodes or JSON path (e.g., $.user.id)..."
          value={localSearchTerm}
          onChange={(e) => setLocalSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-btn">
          🔍
        </button>
        {searchTerm && (
          <>
            <span
              className={`search-results ${
                highlightedNodes.length === 0 ? "no-match" : "match-found"
              }`}
            >
              {highlightedNodes.length === 0
                ? "No match found"
                : `${highlightedNodes.length} match${
                    highlightedNodes.length === 1 ? "" : "es"
                  } found`}
            </span>
            <button type="button" onClick={clearSearch} className="clear-btn">
              ✕
            </button>
          </>
        )}
      </form>
    </div>
  )
}

export default SearchBar

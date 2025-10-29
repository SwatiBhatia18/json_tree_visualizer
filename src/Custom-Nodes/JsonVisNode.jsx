/* eslint-disable react/prop-types */
import { Handle } from "reactflow"
import { useAppSelector } from "../redux/hooks"

// eslint-disable-next-line react/prop-types
function JsonVisNode({ data, targetPosition, sourcePosition, id }) {
  const highlightedNodes = useAppSelector(
    (state) => state.jsonVisualizer.highlightedNodes
  )
  const isHighlighted = highlightedNodes.includes(id)

  const nodeType = data.nodeType || "primitive"

  // Format display text based on node type and structure
  const getDisplayContent = () => {
    if (typeof data.label === "object") {
      // Handle complex objects that are displayed as key-value pairs
      return Object.entries(data.label).map(([key, value], index) => (
        <li key={index}>
          <span className="jsonVisNode__label__key">{key}: </span>
          <span>{String(value)}</span>
        </li>
      ))
    } else {
      // Handle different node types
      switch (nodeType) {
        case "object":
          return data.key || "Object"
        case "array":
          return data.key || "Array"
        case "primitive":
        default:
          if (data.key && data.value !== undefined) {
            // Show key: value for primitive types
            const value = data.value
            const valueStr =
              value === null
                ? "null"
                : typeof value === "string"
                ? `"${value}"`
                : String(value)
            return `${data.key}: ${valueStr}`
          } else {
            return data.label
          }
      }
    }
  }

  // Create tooltip content
  const getTooltipContent = () => {
    const labelText =
      typeof data.label === "object"
        ? JSON.stringify(data.label, null, 2)
        : String(data.label)
    const path = data.path || "N/A"
    return `Path: ${path}\nType: ${nodeType}\nValue: ${labelText}`
  }

  return (
    <>
      <Handle type="target" position={targetPosition}></Handle>
      <div
        className={`jsonVisNode__label ${nodeType} ${
          isHighlighted ? "highlighted" : ""
        }`}
        title={getTooltipContent()}
      >
        <div>
          {typeof data.label === "object" ? (
            <ul>{getDisplayContent()}</ul>
          ) : (
            <div className="node-content">{getDisplayContent()}</div>
          )}
        </div>
      </div>
      <Handle type="source" position={sourcePosition}></Handle>
    </>
  )
}

export default JsonVisNode

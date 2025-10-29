import { useRef } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { setNeedToRenderJson } from "../redux/slices/jsonVisualizerSlice"

function Sidebar() {
  const dispatch = useAppDispatch()
  const needToRenderJson = useAppSelector(
    (state) => state.jsonVisualizer.needToRenderJson
  )
  const textareaEl = useRef(null)

  const jsonString = JSON.stringify(needToRenderJson, null, 2)

  const handleClick = () => {
    try {
      const jsonVal = textareaEl.current.value
      dispatch(setNeedToRenderJson(JSON.parse(jsonVal)))
    } catch (error) {
      alert("Invalid JSON format. Please check your JSON syntax.")
      console.error("JSON Parse Error:", error)
    }
  }

  return (
    <div className="sidebar">
      <div className="sidebar__title-cont">
        <h1 className="sidebar__title-cont__title">JSON Tree Visualizer</h1>
        <div className="sidebar__buttons">
          <button
            className="sidebar__title-cont__render-btn"
            onClick={handleClick}
          >
            🌳 Generate Tree
          </button>
          <button
            className="sidebar__title-cont__clear-btn"
            onClick={() => {
              textareaEl.current.value = ""
              dispatch(setNeedToRenderJson({}))
            }}
          >
            🧹 Clear
          </button>
        </div>
      </div>
      <textarea
        className="sidebar__text-cont"
        name=""
        id=""
        cols="30"
        rows="10"
        defaultValue={jsonString}
        ref={textareaEl}
        placeholder="Enter your JSON data here..."
      ></textarea>
    </div>
  )
}

export default Sidebar

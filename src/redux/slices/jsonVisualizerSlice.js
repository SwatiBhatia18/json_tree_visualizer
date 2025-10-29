import { createSlice } from "@reduxjs/toolkit"
import { applyEdgeChanges, applyNodeChanges } from "reactflow"

const initialState = {
  nodes: [],
  edges: [],
  viewport: { x: 0, y: 0, zoom: 0 },
  searchTerm: "",
  highlightedNodes: [],
  focusNodeId: null,
  needToRenderJson: {
    user: {
      id: 1,
      name: "John Doe",
      address: {
        city: "New York",
        country: "USA",
      },
    },
    items: [
      {
        name: "item1",
      },
      {
        name: "item2",
      },
    ],
  },
}

export const jsonVisualizerSlice = createSlice({
  name: "jsonVisualizer",
  initialState,
  reducers: {
    setNodes: (state, action) => {
      state.nodes = [...action.payload]
    },
    setEdges: (state, action) => {
      state.edges = [...action.payload]
    },
    onNodesChange: (state, action) => {
      state.nodes = applyNodeChanges(action.payload, state.nodes)
    },
    onEdgesChange: (state, action) => {
      state.edges = applyEdgeChanges(action.payload, state.edges)
    },
    setViewport: (state, action) => {
      state.viewport = action.payload
    },
    setNeedToRenderJson: (state, action) => {
      console.log(action.payload)
      state.nodes = []
      state.edges = []
      state.needToRenderJson = { ...action.payload }
      state.searchTerm = ""
      state.highlightedNodes = []
      state.focusNodeId = null
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
    setHighlightedNodes: (state, action) => {
      state.highlightedNodes = action.payload
    },
    setFocusNodeId: (state, action) => {
      state.focusNodeId = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setNodes,
  setEdges,
  onNodesChange,
  onEdgesChange,
  setViewport,
  setNeedToRenderJson,
  setSearchTerm,
  setHighlightedNodes,
  setFocusNodeId,
} = jsonVisualizerSlice.actions

export default jsonVisualizerSlice.reducer

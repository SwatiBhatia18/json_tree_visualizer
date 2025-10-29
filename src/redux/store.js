import { configureStore } from '@reduxjs/toolkit'
import jsonVisualizerReducer from './slices/jsonVisualizerSlice'

export const store = configureStore({
  reducer: {
    jsonVisualizer: jsonVisualizerReducer,
  },
})

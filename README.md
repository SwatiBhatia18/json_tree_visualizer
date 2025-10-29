# JSON Visualizer - Duplicate

A React-based JSON visualizer that converts JSON data into interactive tree diagrams using ReactFlow.

## Features

- **Interactive JSON Tree Visualization**: Convert JSON data into visual tree diagrams
- **Custom Node Rendering**: Display JSON properties in custom-styled nodes
- **JSON Editing**: Edit JSON in the sidebar and generate the tree
- **Dark/Light Theme Toggle**: Switch between theme modes
- **Search Functionality**: Search through your JSON data
- **Responsive Design**: Works across different screen sizes

## Technologies Used

- **React 18** - Modern React with hooks
- **ReactFlow** - Flow-based programming interface
- **Vite** - Fast build tool and development server
- **Redux Toolkit** - Predictable state management
- **React Redux** - Official React bindings for Redux
- **ELK.js** - Automatic graph layout engine
- **Nanoid** - Unique ID generation

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone or download this repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Input JSON**: Use the sidebar to input or edit JSON data
2. **Visualize**: Click the "Run" button to generate the tree visualization
3. **Layout Options**: Use the panel buttons to switch between vertical and horizontal layouts
4. **Navigate**: Use mouse controls to pan and zoom around the visualization

## Project Structure

```
src/
├── components/
│   ├── Header.jsx           # Application header component
│   ├── Sidebar.jsx          # JSON input sidebar component
│   ├── SearchBar.jsx        # Search functionality component
│   └── ThemeToggle.jsx      # Dark/light theme toggle
├── contexts/
│   └── ThemeContext.jsx     # Theme context provider
├── Custom-Nodes/
│   └── JsonVisNode.jsx      # Custom ReactFlow node component
├── Custom Edges/
│   └── JsonVisEdge.jsx      # Custom ReactFlow edge component
├── redux/
│   ├── store.js             # Redux store configuration
│   ├── hooks.js             # Typed Redux hooks
│   └── slices/
│       └── jsonVisualizerSlice.js # JSON visualizer state slice
├── utils/
│   ├── convertJsonToTree.js # JSON to tree conversion utility
│   └── convertTreeToNodes.js # Tree to ReactFlow nodes conversion
├── App.jsx                  # Main application component
├── App.css                  # Application styles
└── main.jsx                # Application entry point
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Example JSON

The application comes with a sample JSON structure .

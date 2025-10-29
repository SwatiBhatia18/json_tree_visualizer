import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ReactFlowProvider } from "reactflow";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { Provider } from 'react-redux';
import { store } from './redux/store.js';

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider>
      <ReactFlowProvider>
        <App />
      </ReactFlowProvider>
    </ThemeProvider>
  </Provider>
);

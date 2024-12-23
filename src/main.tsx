// react-dom/client
import { createRoot } from "react-dom/client";

// Components
import App from "./App.tsx";

// Style
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

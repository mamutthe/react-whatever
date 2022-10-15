import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { Button } from "./components/counter.jsx";
import Todo from "./components/todo.tsx";
import CEPSearcher from "./components/CEPSearcher.tsx";
import "./styles/index.css";


const root = createRoot(document.getElementById("root"));
root.render(<CEPSearcher />);

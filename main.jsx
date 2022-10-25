import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { Button } from "./components/Counter.tsx";
import Todo from "./components/Todo.tsx";
import CEPSearcher from "./components/CEPSearcher.tsx";
import Quiz from "./components/Quiz";
import "./styles/index.css";

const root = createRoot(document.getElementById("root"));
root.render(<Quiz />);

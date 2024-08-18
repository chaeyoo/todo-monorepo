import React from "react";
import { createRoot } from "react-dom/client";

const App: React.FC = () => {
	return <div>Hello, Todo App!</div>;
};

createRoot(document.getElementById("root")!).render(<App />);

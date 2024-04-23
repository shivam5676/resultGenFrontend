import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";import 'animate.css';
import ResultGenerationProvider from "./store/ResultGenerationProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ResultGenerationProvider><App /></ResultGenerationProvider>);



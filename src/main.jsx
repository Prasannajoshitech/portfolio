import React from "react"; // Add this line
import ReactDOM from "react-dom/client";
import App from "./App";
import "./css/main.css";
import reportWebVitals from "./reportWebVitals";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();

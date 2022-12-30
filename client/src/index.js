import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import { ContextProvider } from "./context/ContextProvider";
import { AppProvider } from "./context/appContext";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <ContextProvider>
        <App />
      </ContextProvider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

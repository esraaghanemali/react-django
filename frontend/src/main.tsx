import "./assets/index.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./ui/App";
import { StoreProvider } from "./ui/Store";

const rootNode = document.getElementById("root") as HTMLDivElement;
const root = ReactDOM.createRoot(rootNode);
root.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>,
);

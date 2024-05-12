import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "../routes";
import { Topbar } from "./Base/Topbar";
import LoadingIndicator from "./Common/LoadingIndicator";

export const App: React.FC = () => (
  <div className="App">
    <Topbar />
    <LoadingIndicator />
    <Router>
      <Routes>
        {routes.map((route) => (
          <Route
            path={route.path}
            element={<route.component />}
            key={route.path}
          />
        ))}
      </Routes>
    </Router>
  </div>
);

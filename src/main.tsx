import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App, Detail } from "./App";
import { BrowserRouter, Route, Routes } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/frontend-rocks" element={<App />} />
        <Route path="/frontend-rocks/Dettaglio/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);

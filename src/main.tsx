import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { ThemeProvider } from "@/context/ThemeContext";
import { GitHubProvider } from "@/context/GithubContext";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <GitHubProvider>
        <App />
      </GitHubProvider>
    </ThemeProvider>
  </React.StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApiQueryProvider, ApiClientProvider } from "shared-api";
import { apiClient } from "./lib/api-client";
import "./index.css";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApiQueryProvider>
      <ApiClientProvider value={apiClient}>
        <App />
      </ApiClientProvider>
    </ApiQueryProvider>
  </StrictMode>
);

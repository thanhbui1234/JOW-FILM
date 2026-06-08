import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ApiQueryProvider, ApiClientProvider } from "shared-api";
import { apiClient } from "./lib/api-client";
import { AdminProvider } from "./context/admin-context";
import "./index.css";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ApiQueryProvider>
        <ApiClientProvider value={apiClient}>
          <AdminProvider>
            <App />
          </AdminProvider>
        </ApiClientProvider>
      </ApiQueryProvider>
    </BrowserRouter>
  </StrictMode>
);

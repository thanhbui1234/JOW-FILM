import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ApiQueryProvider, ApiClientProvider } from "shared-api";
import { apiClient } from "./lib/api-client";
import { AdminProvider } from "./context/admin-context";
import { AuthProvider } from "./context/auth-context";
import "./index.css";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ApiQueryProvider>
          <ApiClientProvider value={apiClient}>
            <AdminProvider>
              <App />
            </AdminProvider>
          </ApiClientProvider>
        </ApiQueryProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

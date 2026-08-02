import { createRoot } from "react-dom/client";

import { QueryClientProvider } from "@tanstack/react-query";

import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import ErrorFallback from "./ui/ErrorFallback.jsx";
import queryClient from "./utils/queryClient.js";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onReset={() => window.location.replace("/")}
  >
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </ErrorBoundary>,
);

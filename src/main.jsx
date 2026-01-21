/**
=========================================================
* Cemetery Management System - Frontend Only Version
=========================================================
* This is a frontend-only demo version with mock data
* Credentials: admin / admin123
=========================================================
*/
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/context";
import { installMockApiInterceptor } from "@/utils/mockApiInterceptor";
import "../public/css/tailwind.css";

// Install mock API interceptor for frontend-only version
installMockApiInterceptor();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <MaterialTailwindControllerProvider>
          <App />
        </MaterialTailwindControllerProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

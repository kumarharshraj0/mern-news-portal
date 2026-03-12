import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { NewsProvider } from "./context/NewsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
         <NewsProvider>
       <App />
        </NewsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);



import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import "./App";
import App from "./App";
import "./Assets/styles/style.css";
import { CounterContextProvider } from "./context/Data-counter";
import { UserContextProvider } from "./context/DataContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
const client = new QueryClient();
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <CounterContextProvider>
        <QueryClientProvider client={client}>
          <Router>
          <App />
          </Router>
        </QueryClientProvider>
      </CounterContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { TodosContextProvider } from "./context/TodoContext";
import { AuthContextProvider } from "./context/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TodosContextProvider>
        <App />
      </TodosContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

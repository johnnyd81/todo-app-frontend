import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("https://todo-app-backend-19ql.onrender.com/api/users/login", {
      //when a user logs in the request hits this endpoint as a post request
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      //the line below saves the user to localStorage i.e. the username and the json web token
      localStorage.setItem("user", JSON.stringify(json));

      //update the auth context using the dispatch function
      dispatch({ type: "LOG_IN", payload: json });

      setIsLoading(false);
    }
  };

  return { login, isLoading, error }; //the hook returns these values
};

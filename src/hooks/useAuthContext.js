import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error(
      "useAuthContext can only be used inside the AuthContextProvider"
    );
  }

  return context; //the context variable contains the global state values i.e. state.user and the dispatch function
};

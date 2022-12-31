import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (
    action.type //keeps the state updated by checking the action.type and updating the state accordingly
  ) {
    case "LOG_IN":
      return {
        user: action.payload,
      };
    case "LOG_OUT":
      return {
        user: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  //the useEffect hook will check that a user is logged in by checking for the user in localStorage
  useEffect(() => {
    //I have to parse the user stored in localStorage since it is stored as a string value
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      //if the user is present in localStorage then the dispatch function updates the state to show that the user is logged in
      dispatch({ type: "LOG_IN", payload: user });
    }
  }, []); //the dependency array is empty so the useEffect only runs once

  console.log("AuthContext state", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

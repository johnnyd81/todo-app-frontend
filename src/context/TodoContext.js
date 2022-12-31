import { createContext, useReducer } from "react";

export const TodosContext = createContext();

export const todoReducer = (state, action) => {
  //the todoReducer is the first parameter in the useReducer hook
  switch (
    action.type //takes an action.type to know how to update the global todo state
  ) {
    case "GET_TODOS":
      return {
        todos: action.payload,
      };
    case "ADD_TODO":
      return {
        todos: [...state.todos, action.payload],
      };
    case "DELETE_TODO":
      return {
        todos: state.todos.filter((t) => t._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const TodosContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: null,
  });
  //the state i.e state.todos and the dispatch function are the values made available to all components in the application
  return (
    <TodosContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};

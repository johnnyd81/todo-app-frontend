import { TodosContext } from "../context/TodoContext";
import { useContext } from "react";

export const useTodoContext = () => {
  const context = useContext(TodosContext);

  if (!context) {
    throw Error(
      "useTodoContext can only be used inside the TodoContextProvider"
    );
  }

  return context;
};

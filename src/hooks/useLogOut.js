import { useAuthContext } from "./useAuthContext";
import { useTodoContext } from "./useTodoContext";

export const useLogOut = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: todoDispatch } = useTodoContext();

  const logout = () => {
    //to log the user out I remove the user from localStorage
    localStorage.removeItem("user");

    //use the dispatch function to update the global state
    dispatch({ type: "LOG_OUT" });
    todoDispatch({ type: "GET_TODOS", payload: null });
  };

  return { logout };
};

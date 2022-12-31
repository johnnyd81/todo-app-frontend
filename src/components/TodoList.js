import React from "react";
//the two imports below are hooks that import state for the user authentication and to update the global state
import { useAuthContext } from "../hooks/useAuthContext";
import { useTodoContext } from "../hooks/useTodoContext";

const TodoList = ({ todo, setError }) => {
  const { dispatch } = useTodoContext();
  const { user } = useAuthContext();

  const removeTodo = async () => {
    if (!user) {
      //prevents an unauthorized user from proceeding
      return;
    }

    const response = await fetch(
      "https://todo-app-backend-19ql.onrender.com/api/todos/" + todo._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`, //the header has to have a valid token or the user cannot delete a todo
        },
      }
    );

    const json = await response.json();

    if (response.ok) {
      console.log("Todo deleted", json);
      setError(null);
      dispatch({ type: "DELETE_TODO", payload: json }); //the dispatch function keeps the global state updated when a todo is deleted
    }
  };

  return (
    <div>
      <p onClick={removeTodo} className="list-item">
        {todo.description}
      </p>
    </div>
  );
};

export default TodoList;

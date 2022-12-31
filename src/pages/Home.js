import React, { useEffect, useState } from "react";
import TodoList from "../components/TodoList";
import { useTodoContext } from "../hooks/useTodoContext"; //imports the hook that contains the global state
import { useAuthContext } from "../hooks/useAuthContext"; //imports the hook that contains the authorization state

const Home = () => {
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  //the global state values can be accessed by calling the useTodoContext hook i.e. state.todos and the dispatch function
  const { todos, dispatch } = useTodoContext();
  const [noTodo, setNoTodo] = useState([]);
  //by calling the user state below I can assess if the user is authorized or not and fetch data accordingly
  const { user } = useAuthContext();

  useEffect(() => {
    //the useEffect hook fetches data on mount if the user is authenticated
    const fetchTodos = async () => {
      const response = await fetch("/api/todos", {
        headers: {
          Authorization: `Bearer ${user.token}`, //Authorization checks that a user has a valid token to access data in the database
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "GET_TODOS", payload: json }); //the dispatch function updates the global state by fetching data
      }
    };
    if (user) {
      //if a user is authorized then data is fetched from the database
      fetchTodos();
    }
  }, [dispatch, user]);

  const addNewTodo = async () => {
    if (!user) {
      //the if statement checks for a valid user. If no user exists it returns out of the function
      setError("User must be logged in");
      return;
    }

    const newTodo = { description };

    const response = await fetch("/api/todos/add", {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`, //the Authorization header makes sure that only valid users can add new todos
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setNoTodo(json.noTodo);
      console.log(noTodo);
    }

    if (response.ok) {
      setDescription("");
      setError(null);
      setNoTodo([]);
      console.log("new todo", json);
      dispatch({ type: "ADD_TODO", payload: json });
    }
  };

  return (
    <div>
      <div>
        <h3 className="todoHeading">To delete an item simply click on it</h3>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter a todo"
        />
        <br />
        <button onClick={addNewTodo} className="submitButton">
          Add todo
        </button>
      </div>
      {error && <div className="error">{error}</div>}
      <div className="theList">
        {todos &&
          todos.map((todo) => (
            <TodoList key={todo._id} todo={todo} setError={setError} />
          ))}
      </div>
    </div>
  );
};

export default Home;

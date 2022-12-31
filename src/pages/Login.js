import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin(); //the useLogin hook returns values that update the AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(username, password); //similar to the signup function the login function provides a token to allow the user to use the app
  };

  return (
    <div>
      <Form className="container">
        <Form.Group>
          <Form.Label className="label">Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Form.Label className="label mt-2">Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button
          onClick={handleSubmit}
          className=" button mt-4"
          disabled={isLoading}
          variant="success"
        >
          Log in
        </Button>
        {error && <div className="error">{error}</div>}
      </Form>
    </div>
  );
};

export default Login;

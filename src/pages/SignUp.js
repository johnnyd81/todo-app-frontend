import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useSignUp } from "../hooks/useSignUp"; //the useSignUp hook returns values that updates the global AuthContext

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error } = useSignUp();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(username, password); //by adding a username and a password the new user receives a token to use the todo app
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
          className="button mt-4"
          disabled={isLoading}
          variant="primary"
        >
          Sign up
        </Button>
        {error && <div className="error">{error}</div>}
      </Form>
    </div>
  );
};

export default SignUp;

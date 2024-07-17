import React from "react";
import LoginForm from "../components/auth/LoginForm";

export default class Login extends React.Component {
  render() {
    return (
      <div className="container mt-2">
        <h1>Login</h1>
        <LoginForm />
      </div>
    );
  }
}

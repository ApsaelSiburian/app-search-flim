import React, { useState } from "react";

const LoginForm = ({ onLogin, showRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");
    if (username === storedUsername && password === storedPassword) {
      onLogin(username);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="form-container login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <button onClick={showRegister}>Register</button>
    </div>
  );
};

export default LoginForm;

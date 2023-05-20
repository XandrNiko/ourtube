import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi"
import "./style.css";

const АuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      console.log(`Email: ${email}, Password: ${password}`);
      window.location = "/";
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>OUR TUBE</h1>
        <input
          required
          type="email"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          required
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit" className="login-button">
          Войти
        </button>
      </form>
    </div>
  );
};

export default АuthPage;
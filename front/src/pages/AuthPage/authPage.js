import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi"
import "./style.css";

const АuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>OUR TUBE</h1>
        <input
          type="username"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={handlePasswordChange}
        />
        <Link to="/" className="login-button">
          <FiHome/>
        </Link>
      </form>
    </div>
  );
};

export default АuthPage;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import bcrypt from "bcryptjs";
import { FiHome } from "react-icons/fi"
import { submitLoginForm } from "../../videos_api/videos";
import "./authPage.css";

const АuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
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
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      submitLoginForm(formData).then(response => {
        sessionStorage.setItem("id", response["id"]);
        window.location = "/";
      }).catch(error => {
        console.error(error);
        setAuthError('Пользователь не найден.');
      });
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="dialog-page">
      <div className="dialog-container">
        <form onSubmit={handleSubmit} className="dialog-input">
          <h1>OUR TUBE</h1>
          <div className="input-wrapper">
            <input
              required
              type="email"
              placeholder="Email"
              className="dialog-input-field"
              value={email}
              onChange={handleEmailChange}
            />
            <input
              required
              type="password"
              placeholder="Пароль"
              className="dialog-input-field"
              value={password}
              onChange={handlePasswordChange}
            />
            <p className="register-error">{authError}</p>
          </div>
          <button type="submit" className="dialog-button">
            Войти
          </button>
          <p className="login-signup-link">
            Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default АuthPage;
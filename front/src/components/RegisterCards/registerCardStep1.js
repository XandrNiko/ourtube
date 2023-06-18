import React, { useState } from "react";
import PropTypes from "prop-types";
import bcrypt from "bcryptjs";
import { FiChevronRight } from "react-icons/fi";

import "./style.css";

const RegisterCardStep1 = ({ onNext, onPrev, onFinish }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

    const validateEmail = () => {
        if (email.trim() === "") {
            setEmailError("Требуется указать email.");
            return false;
        } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) === false) {
            setEmailError("Email не валидный.");
            return false;
        } else {
            setEmailError("");
            return true;
        }
    };

    const validatePassword = () => {
        if (password.length < 6) {
            setPasswordError("Пароль должен состоять как минимум из 6 символов.");
            return false;
        } else {
            setPasswordError("");
            return true;
        }
    };

    const validateConfirmPassword = () => {
        if (password !== confirmPassword) {
            setConfirmPasswordError("Пароли не совпадают.");
            return false;
        } else {
            setConfirmPasswordError("");
            return true;
        }
    }

    const handleNextClick = (e) => {
        e.preventDefault();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        if (isEmailValid && isPasswordValid && isConfirmPasswordValid) {
            const formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);
            onNext(formData);
        }
    };

    return (
        <div className="dialog">
            <div className="dialog-input">
                <h1>РЕГИСТРАЦИЯ</h1>
                <div className="input-wrapper">
                    <input
                        required
                        type="email"
                        placeholder="Email"
                        className="dialog-input-field"
                        value={email}
                        onChange={handleEmailChange}
                        onBlur={validateEmail}
                    />
                    <input
                        required
                        type="password"
                        placeholder="Пароль"
                        className="dialog-input-field"
                        value={password}
                        onChange={handlePasswordChange}
                        onBlur={validatePassword}
                    />
                    <input
                        required
                        type="password"
                        placeholder="Подверждение пароля"
                        className="dialog-input-field"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        onBlur={validateConfirmPassword}
                    />
                    <p className="register-error">{emailError} {passwordError} {confirmPasswordError}</p>
                </div>
                <button className="dialog-button" onClick={handleNextClick}>
                    Далее
                </button>
            </div>
        </div>
    );
};

RegisterCardStep1.propTypes = {
    onNext: PropTypes.func.isRequired,
};

export default RegisterCardStep1;
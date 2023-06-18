import React, { useState } from "react";
import PropTypes from "prop-types";
import FileDropzone from "../FileDropzone/fileDropzone";
import "./style.css";

const RegisterCardStep2 = ({ onNext, onPrev, onFinish }) => {
    const [nickname, setNickname] = useState("");
    const [nicknameError, setNicknameError] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const handleNicknameChange = (e) => setNickname(e.target.value);

    const validateNickname = () => {
        if (nickname.trim() === "") {
            setNicknameError("Nickname is required");
        } else {
            setNicknameError("");
        }
    };

    const handleFileSelect = (file) => {
        const selectedFile = file[0];
        setSelectedFile(selectedFile);
    };

    const handleRegisterClick = (e) => {
        e.preventDefault();
        validateNickname();
        if (selectedFile && !nicknameError) {
            const formData = new FormData();
            formData.append("nickname", nickname);
            formData.append("profilePic", selectedFile);
            onFinish(formData);
        }
    };

    return (
        <div className="dialog">
            <div className="dialog-input">
                <h1>РЕГИСТРАЦИЯ</h1>
                <div className="input-wrapper profilePic-dropzone">
                    <input
                        required
                        type="text"
                        placeholder="Имя"
                        className="dialog-input-field"
                        value={nickname}
                        onChange={handleNicknameChange}
                        onBlur={validateNickname}
                    />
                    <FileDropzone handleFileDrop={handleFileSelect} value={"Перетащите картинку сюда или нажмите, чтобы загрузить логотип"} />
                </div>
                <button className="dialog-button register-button" onClick={handleRegisterClick}>
                    Зарегистрироваться
                </button>
            </div>
        </div>
    );
};

export default RegisterCardStep2;
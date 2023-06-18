import React, { useState } from "react";
import PropTypes from "prop-types";
import FileDropzone from "../FileDropzone/fileDropzone";
import "./style.css";

const ImportCardStep2 = ({ onNext, onPrev, onFinish }) => {

    const handleNextClick = (e) => {
        e.preventDefault();
        const videoData = new FormData();
        videoData.append('image', imageFile);
        videoData.append('video', videoFile);
        onFinish(videoData);
        onNext(new FormData());
    };

    const [imageFile, setImageFile] = useState('');
    const [videoFile, setVideoFile] = useState(null);

    const handleImageSelect = (acceptedFiles) => {
        const selectedFile = acceptedFiles[0];
        setImageFile(selectedFile);
    };

    const handleVideoSelect = (acceptedFiles) => {
        const selectedFile = acceptedFiles[0];
        setVideoFile(selectedFile);
    };

    return (
        <div className="dialog">
            <div className="dialog-input import-step2-dropzone">
                <h1>ИМПОРТ</h1>
                <label>Превью:</label>
                <FileDropzone handleFileDrop={handleImageSelect} value={"Перетащите картинку сюда или нажмите, чтобы загрузить превью"} />
                <label>Видео:</label>
                <FileDropzone handleFileDrop={handleVideoSelect} value={"Перетащите видеофайл сюда или нажмите, чтобы загрузить видео"} />
                <div className="dialog-hor-container">
                    <button className="dialog-button" onClick={onPrev}>
                        Назад
                    </button>
                    <button className="dialog-button" onClick={handleNextClick}>
                        Далее
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImportCardStep2;
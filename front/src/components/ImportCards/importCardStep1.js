import React, { useState } from "react";
import PropTypes from "prop-types";
import "./style.css";

const ImportCardStep1 = ({ onNext, onPrev, onFinish }) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [author, setAuthor] = useState("");
    const [uploadDate, setUploadDate] = useState("");

    const handleNextClick = (e) => {
        e.preventDefault();
        const videoData = new FormData();
        videoData.append('title', title);
        videoData.append('description', description);
        onNext(videoData);
    };

    return (
        <div className="dialog">
            <div className="dialog-input">
            <h1>ИМПОРТ</h1>
                <div className="input-wrapper">
                <label>Заголовок:</label>
                    <input 
                        type="text" 
                        className="dialog-input-field" 
                        value={title} 
                        onChange={(event) => setTitle(event.target.value)} 
                    />
                    <label>Описание:</label>
                    <textarea 
                        value={description} 
                        className="dialog-input-field description-input-field" 
                        onChange={(event) => setDescription(event.target.value)} 
                    />
                </div>
                <button className="dialog-button" onClick={handleNextClick}>
                    Далее
                </button>
            </div>
        </div>
    );
};

export default ImportCardStep1;
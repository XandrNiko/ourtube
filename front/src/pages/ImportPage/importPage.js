import React, { useState } from "react";
import { Link } from 'react-router-dom';

import MultiStepForm from "../../components/MultiStepForm/multiStepForm";
import ImportCardStep1 from "../../components/ImportCards/importCardStep1";
import ImportCardStep2 from "../../components/ImportCards/importCardStep2";
import ImportCardStep3 from "../../components/ImportCards/importCardStep3";
import ImportCardStep4 from "../../components/ImportCards/importCardStep4";
import { postVideo, getUser } from "../../videos_api/videos";


import "./importPage.css";

const ImportPage = () => {
    const [formData, setFormData] = useState(new FormData());
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const steps = [ImportCardStep1, ImportCardStep2, ImportCardStep3];

    const handleSubmit = (videoData) => {
        setIsLoading(true);
        getUser(sessionStorage.getItem("id"))
            .then((response) => {
                videoData.append('author', response["nickname"]);
                videoData.append('authorId', sessionStorage.getItem("id"));
                videoData.append('upload_date', Date());
                postVideo(videoData).then(response => {
                    setIsLoading(false);
                    console.log(response);
                    setMessage('Видео успешно загружено');
                }).catch(error => {
                    setIsLoading(false);
                    console.error(error);
                    setMessage('В видео обнаружен деструктивный контент');
                });
            })
            .catch((error) => console.error(error));
    };


    return (
        <div className="import-page dialog-page">
            {isLoading && <MultiStepForm steps={steps} onFinish={handleSubmit} />}
            {!isLoading && <MultiStepForm steps={[ImportCardStep4]} />}
            <p>{message}</p>
        </div>
    );
};

export default ImportPage;
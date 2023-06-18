import React, { useState } from "react";

import MultiStepForm from "../../components/MultiStepForm/multiStepForm";
import RegisterCardStep1 from "../../components/RegisterCards/registerCardStep1";
import RegisterCardStep2 from "../../components/RegisterCards/registerCardStep2";
import { postUser } from "../../videos_api/videos";

import "./registerPage.css";

const RegisterPage = () => {
    const [formData, setFormData] = useState(new FormData());
    const steps = [RegisterCardStep1, RegisterCardStep2];

    const handleSubmit = (userData) => {
        postUser(userData).then(response => {
            console.log(response);
        }).catch(error => {
            console.error(error);
        });
        window.location = "/auth";
    };

    return (
        <div className="dialog-page">
            <MultiStepForm steps={steps} onFinish={handleSubmit} />
        </div>
    );
};

export default RegisterPage;
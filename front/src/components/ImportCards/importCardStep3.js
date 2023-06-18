import React, { useState } from "react";
import PropTypes from "prop-types";
import Spinner from "../Spinner/spinner";
import "./style.css";

const ImportCardStep3 = ({ onNext, onPrev, onFinish }) => {



    return (
        <div className="dialog">
            <div className="dialog-input import-step3-dialog">
                <h1>ИМПОРТ</h1>
                <label>Идет загрузка видео... Подождите.</label>
                <Spinner />
            </div>
        </div>
    );
};

export default ImportCardStep3;
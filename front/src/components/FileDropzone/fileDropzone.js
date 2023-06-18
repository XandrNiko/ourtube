import React, { useState } from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import './fileDropzone.css';

const FileDropzone = ({ handleFileDrop, value }) => {
  const [file, setFile] = useState(null);

  const handleDrop = (acceptedFiles) => {
    const currentFile = acceptedFiles[0];
    setFile(currentFile);
    handleFileDrop(acceptedFiles);
  };

  return (
    <div className="dropzone-container">
      <Dropzone onDrop={handleDrop} className="dropzone">
        {({ getRootProps, getInputProps, isDragAccept, isDragActive }) => (
          <div
            {...getRootProps()}
            className={`dropzone-content ${isDragActive ? "active" : ""} ${
              isDragAccept ? "accept" : ""
            }`}
          >
            <div className="dropzone-frame" />
            <input {...getInputProps()} />
            {file ? (
              <>
                <div className="file-preview">
                  <img src={URL.createObjectURL(file)} alt={file.name} />
                </div>
                <p>Выбранный файл: {file.name}</p>
              </>
            ) : (
              <>
                <div className="dropzone-text">
                  <p>{value}</p>
                </div>
              </>
            )}
          </div>
        )}
      </Dropzone>
    </div>
  );
};

FileDropzone.propTypes = {
  handleFileDrop: PropTypes.func.isRequired,
};

export default FileDropzone;
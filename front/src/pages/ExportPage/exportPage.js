import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import { postVideo } from '../../videos_api/videos';
import Dropzone from 'react-dropzone';
import Card from '../../components/Card/card';
import "./style.css";

const ExportPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [uploadDate, setUploadDate] = useState('');
    const [imageFile, setImageFile] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [status, setStatus] = useState('');

    const handleImageDrop = (acceptedFiles) => {
        const selectedFile = acceptedFiles[0];
        setImageFile(selectedFile);
    };

    const handleVideoDrop = (acceptedFiles) => {
        const selectedFile = acceptedFiles[0];
        setVideoFile(selectedFile);
        setAuthor("John Doe");
        setUploadDate(Date);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const videoData = new FormData();
        videoData.append('title', title);
        videoData.append('description', description);
        videoData.append('author', author);
        videoData.append('upload_date', uploadDate);
        videoData.append('image', imageFile);
        videoData.append('video', videoFile);

        postVideo(videoData).then(response => {
            console.log(response);
            setStatus('Video successfully added');
        }).catch(error => {
            console.error(error);
            setStatus('Failed to add video');
        });
    };

    return (
        <form onSubmit={handleSubmit} className={"form"}>
            <Card></Card>
            <div className={"form-field"}>
                <label>Заголовок:</label>
                <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} className={"input"} />
            </div>
            <div className={"form-field"}>
                <label>Описание:</label>
                <textarea value={description} onChange={(event) => setDescription(event.target.value)} className={"textarea"} />
            </div>
            <div className={"form-field"}>
                <label>Автор:</label>
                <p className={"input"}>{author}</p>
            </div>
            <div className={"form-field"}>
                <label>Дата загрузки:</label>
                <p className={"input"}>{uploadDate}</p>
            </div>
            <Dropzone onDrop={handleImageDrop} className={"dropzone"}>
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Перетащите картинку сюда или нажмите, чтобы выбрать файл.</p>
                        <FaUpload size={40} />
                        {imageFile && <p>Выбранный файл: {imageFile.name}</p>}
                    </div>
                )}
            </Dropzone>
            <Dropzone onDrop={handleVideoDrop} className={"dropzone"}>
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Перетащите видео сюда или нажмите, чтобы выбрать файл.</p>
                        <FaUpload size={40} />
                        {videoFile && <p>Выбранный файл: {videoFile.name}</p>}
                    </div>
                )}
            </Dropzone>
            <button type="submit">Загрузить</button>
            {status && <p>{status}</p>}
        </form>
    );
}

export default ExportPage;
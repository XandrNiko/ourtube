import axios from 'axios';

const API_URL = "http://127.0.0.1:5000";

export const getVideo = async (videoId) => {
    try {
        const response = await axios.get(`${API_URL}/videos/${videoId}`);
        const videoData = response.data;

        return videoData;
    } catch (error) {
        console.error(error);

        // Обработка ошибки
        throw error;
    }
};

export const getVideosByCount = async (count) => {
    try {
        const response = await axios.get(`${API_URL}/videos/count/${count}`);
        const videosList = response.data;

        return videosList;
    } catch (error) {
        console.error(error);

        // Обработка ошибки
        throw error;
    }
};

export const getAllVideos = async () => {
    try {
        const response = await axios.get(`${API_URL}/videos`);
        const videosList = response.data;

        return videosList;
    } catch (error) {
        console.error(error);

        // Обработка ошибки
        throw error;
    }
};

export const postVideo = async (videoData) => {
    try {
        const response = await axios.post(`${API_URL}/videos`, videoData);
        const responseData = response.data;

        return responseData;
    } catch (error) {
        console.error(error);

        // Обработка ошибки
        throw error;
    }
};
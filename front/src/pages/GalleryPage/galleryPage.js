import React, { useState, useEffect } from 'react';
import { getAllVideos } from '../../videos_api/videos';
import VideoGrid from "../../components/VideoGrid/videoGrid";
import Card from "../../components/Card/card";
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import "./style.css";

const GalleryPage = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoClick = (video) => {
    setSelectedVideo(video.videoSrc);
  };

  useEffect(() => {
    getAllVideos()
      .then((response) => {
        const updatedVideos = response.map((video, index) => ({
          ...video,
        }));
        setVideos(updatedVideos);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="gallery-page">
      <Card></Card>
      {selectedVideo && (
        <VideoPlayer
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
      <VideoGrid videos={videos} onVideoClick={handleVideoClick} />
    </div>
  );
};

export default GalleryPage;
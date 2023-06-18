import React from 'react';
import VideoCard from '../VideoCard/videoCard';
import './videoGrid.css';

const VideoGrid = ({ videos, onVideoClick }) => (
  <div className="video-grid">
    {videos.map((video) => (
      <VideoCard
        key={video.id}
        video={video}
        onVideoClick={onVideoClick}
      />
    ))}
  </div>
);
export default VideoGrid;
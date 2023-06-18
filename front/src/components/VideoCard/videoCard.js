import React, { useState } from 'react';
import './videoCard.css';

const VideoCard = ({ video, onVideoClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const overlayStyle = {
    opacity: isHovered ? '0' : '1',
    transition: 'opacity 0.3s ease-in-out',
  };

  return (
    <div
      className="video-card"
      onClick={() => onVideoClick(video)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="video-card-image-container">
        <img src={video.imageSrc} alt="Video Thumbnail" className="video-card-image" />
        <div className="video-card-overlay" style={overlayStyle}>
          <div className="vvideo-card-overlay-text">
            <h3 className="video-card-overlay-title">{video.title}</h3>
            <p className="video-card-overlay-author">{video.author}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
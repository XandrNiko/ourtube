import React, { useState } from 'react';
import './style.css';

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
      <div className="video-card__image-container">
        <img src={video.imageSrc} alt="Video Thumbnail" className="video-card__image" />
        <div className="video-card__overlay" style={overlayStyle}>
          <div className="video-card__overlay-text">
            <h3 className="video-card__overlay-title">{video.title}</h3>
            <p className="video-card__overlay-author">{video.author}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
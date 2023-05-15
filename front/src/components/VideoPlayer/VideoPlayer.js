import React, { useRef, useEffect } from "react";

const VideoPlayer = ( videoSrc ) => {
  const videoRef = useRef(null);

  useEffect(() => {
    console.log(videoSrc);
  }, []);

  const handleCanPlay = () => {
    videoRef.current.play();
  };

  return (
    <video
      ref={videoRef}
      controls
      onCanPlay={handleCanPlay}
      style={{ width: "100%" }}
    >
      <source src={videoSrc} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
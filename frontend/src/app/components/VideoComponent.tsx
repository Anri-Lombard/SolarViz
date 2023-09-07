// VideoComponent.tsx
import React from 'react';
function VideoComponent() {
  return (
    <div className="video-container">
      <video controls autoPlay>
        <source src="/Videos/Video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoComponent;
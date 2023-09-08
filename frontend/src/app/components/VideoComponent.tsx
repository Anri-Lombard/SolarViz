// VideoComponent.tsx
import React from 'react';
import { usePlayVideo } from '../contexts/PlayVideoContext';

function VideoComponent() {
  const { playWithAudio } = usePlayVideo();

  return (
    <div className="video-container">
      <video controls autoPlay muted={!playWithAudio}>
        <source src="/Videos/Video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoComponent;
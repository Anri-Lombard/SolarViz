// VideoComponent.tsx
import React from 'react';

export function VideoComponent({ playWithAudio }: { playWithAudio: boolean }) {
  return (
    <div className="video-container">
      <video autoPlay muted={!playWithAudio}>
        <source src="/Videos/Video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
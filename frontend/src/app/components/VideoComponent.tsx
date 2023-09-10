import React, { useEffect, useRef } from 'react';

export function VideoComponent({ playWithAudio, setVideoDuration }: { playWithAudio: boolean, setVideoDuration: Function }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('loadedmetadata', () => {
        setVideoDuration(video.duration);
      });
    }
  }, []);

  return (
    <div>
      <video ref={videoRef} id="video-element" autoPlay muted={!playWithAudio}>
        <source src="/Videos/Video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

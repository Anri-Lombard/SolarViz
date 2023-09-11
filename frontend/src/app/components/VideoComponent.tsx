import React, { useEffect, useRef } from 'react';

export function VideoComponent({ playWithAudio, setVideoDuration, style }: { playWithAudio: boolean, setVideoDuration: Function, style: React.CSSProperties }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('loadedmetadata', () => {
        setVideoDuration(video.duration);
        video.play().catch((error) => {
          console.error("Video play failed:", error);
        });
      });
    }
  }, []);

  return (
    <video width={400} height={400} autoPlay ref={videoRef} controls muted={!playWithAudio} style={style}>
      <source src="/Videos/video.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}


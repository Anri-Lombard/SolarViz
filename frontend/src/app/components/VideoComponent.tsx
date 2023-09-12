import React, { useEffect, useRef } from 'react';

/**
 * VideoComponent displays a video player.
 *
 * @param {Object} props                      The component's props.
 * @param {boolean} props.playWithAudio       Indicates whether to play the video with audio.
 * @param {Function} props.setVideoDuration   Callback to set the video duration.
 * @param {React.CSSProperties} props.style   Inline styles for the video element.
 * @returns {JSX.Element}                     The VideoComponent JSX.
 */

export function VideoComponent({ playWithAudio, setVideoDuration, style }: { playWithAudio: boolean, setVideoDuration: Function, style: React.CSSProperties }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Listen for the 'loadedmetadata' event to get video duration
      video.addEventListener('loadedmetadata', () => {
        setVideoDuration(video.duration);

        // Play the video (with muted if playWithAudio is false)
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


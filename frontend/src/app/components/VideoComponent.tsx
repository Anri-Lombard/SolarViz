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
      });
    }
  }, [setVideoDuration]);

  useEffect(() => {
    const video = videoRef.current;
    if (video && style.display === 'block') {
      video.play().catch((error) => {
        console.error("Video play failed:", error);
      });
    }
  }, [style]);

  // TODO: user has to unmute to play
  return (
    <video width={600} height={600} ref={videoRef} controls muted={true} style={style}>
      <source src="/Videos/video.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}


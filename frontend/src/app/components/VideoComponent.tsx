import React, { useEffect, useRef } from 'react';

const BASE_URL = 'http://localhost:8000';

/**
 * VideoComponent displays a video player.
 *
 * @param {Object} props                      The component's props.
 * @param {boolean} props.playWithAudio       Indicates whether to play the video with audio.
 * @param {Function} props.setVideoDuration   Callback to set the video duration.
 * @param {React.CSSProperties} props.style   Inline styles for the video element.
 * @returns {JSX.Element}                     The VideoComponent JSX.
 */

export function VideoComponent({ videoUrl, playWithAudio, setVideoDuration, style }: { videoUrl: string | null, playWithAudio: boolean, setVideoDuration: Function, style: React.CSSProperties }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  console.log("videoUrl", videoUrl);

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
    <div style={style}>
      {videoUrl ? (
        <video width={600} height={800} ref={videoRef} controls autoPlay muted={true}>
          <source src={BASE_URL + videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>No video selected</p>
      )}
    </div>
  );
}


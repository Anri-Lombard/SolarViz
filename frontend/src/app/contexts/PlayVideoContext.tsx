import React, { createContext, useContext, useState } from 'react';

interface PlayVideoContextProps {
  playVideo: boolean;
  playWithAudio: boolean;
  setPlayVideo: (value: boolean, audio: boolean) => void;
}

const PlayVideoContext = createContext<PlayVideoContextProps | undefined>(undefined);

export const PlayVideoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playVideo, setPlayVideoState] = useState<boolean>(false);
  const [playWithAudio, setPlayWithAudio] = useState<boolean>(true);

  const setPlayVideo = (value: boolean, audio: boolean) => {
    setPlayVideoState(value);
    setPlayWithAudio(audio);
  };

  return (
    <PlayVideoContext.Provider value={{ playVideo, playWithAudio, setPlayVideo }}>
      {children}
    </PlayVideoContext.Provider>
  );
};

export const usePlayVideo = () => {
  const context = useContext(PlayVideoContext);
  if (context === undefined) {
    throw new Error('usePlayVideo must be used within a PlayVideoProvider');
  }
  return context;
};

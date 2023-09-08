import React, { createContext, useContext, useState } from 'react';

interface PlayVideoContextProps {
  playVideo: boolean;
  setPlayVideo: (value: boolean) => void;
}

const PlayVideoContext = createContext<PlayVideoContextProps | undefined>(undefined);

export const PlayVideoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playVideo, setPlayVideo] = useState<boolean>(false);

  return (
    <PlayVideoContext.Provider value={{ playVideo, setPlayVideo }}>
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

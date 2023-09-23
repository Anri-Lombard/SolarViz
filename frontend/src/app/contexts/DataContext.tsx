import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';

import { DataContextProps } from '../types/contextTypes';
import { DataType, WaterDataType } from '../types/dataTypes';

// Create the context
export const DataContext = createContext<DataContextProps>({
  powerData: [],
  waterData: [],
  videoUrl: null,
  videoList: [],
  selectedVideo: null,
  uploadVideo: () => { throw new Error('uploadVideo function must be overridden'); },
  setSelectedVideo: () => { throw new Error('setSelectedVideo function must be overridden'); },
});

// Create the provider component
export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [powerData, setPowerData] = useState<DataType[]>([]);
  const [waterData, setWaterData] = useState<WaterDataType[]>([]);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoList, setVideoList] = useState<string[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    // Fetch power data
    fetch('http://localhost:8000/api/power_data/')
      .then((response) => response.json())
      .then((data: DataType[]) => setPowerData(data));

    // Fetch water data
    fetch('http://localhost:8000/api/water_data/')
      .then((response) => response.json())
      .then((data: WaterDataType[]) => setWaterData(data));

    // Fetch video URL
    fetch('http://localhost:8000/api/get_uploaded_video/')
      .then((response) => response.json())
      .then((data) => {
        setVideoUrl(data.file_url)
      })
      .catch((error) => console.error('Error fetching video:', error));

    // Fetch video list
    fetch('http://localhost:8000/api/list_uploaded_videos/')
      .then((response) => response.json())
      .then((data) => {
        console.log("Returned video list data:", data);
        if (data.length > 0) {
          setVideoList(data)
        } else {
          setVideoList(["No videos uploaded"])
        }
      })
      .catch((error) => console.error('Error fetching video list:', error));
  }, []);

  // Function to handle video upload
  const uploadVideo = useCallback(async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/api/upload_video/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Video upload failed');
      }

      const data = await response.json();
      setVideoUrl(data.file_url);
      setVideoList(prevList => [...prevList, data.file_url]); // Update the video list
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  }, []);

  return (
    <DataContext.Provider value={{ powerData, waterData, videoUrl, videoList, selectedVideo, uploadVideo, setSelectedVideo }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use the DataContext
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

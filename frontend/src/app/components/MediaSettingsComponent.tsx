import React, { useEffect, useState } from 'react';

interface MediaSettingsProps {

  /**
   * Function to handle changes in media settings.
   *
   * @param {string} field - The field to update (e.g., 'sequence', 'display', 'audio').
   * @param {any} value - The new value for the field.
   */

  handleMediaSettingsChange: (field: string, value: any) => void;


  // The media settings object.

  settings: {
    sequence: number;
    display: boolean;
    audio: boolean;
  };
  uploadVideo: (file: File) => void;
  videoList: {
    id: string;
    url: string;
  }[] | null;
  selectedVideo: string | null;
  setSelectedVideo: React.Dispatch<React.SetStateAction<string | null>>;
}

const MediaSettingsComponent: React.FC<MediaSettingsProps> = ({
  handleMediaSettingsChange,
  settings,
  videoList,
  uploadVideo,
  selectedVideo,
  setSelectedVideo,
}) => {

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (videoList!.map((video) => video.url.split('/').pop()).includes(file!.name)) {
      window.alert('Video with same name already uploaded');
      return;
    } else {
      if (window.confirm(`Upload ${e.target.files?.[0].name}?`)) {
        if (file) {
          await uploadVideo(file);
        }
      }
    }
  };

  const handleVideoSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (window.confirm(`Select ${e.target.value.split('/').pop()} to play on dashboard?`))
      setSelectedVideo(e.target.value);
  };

  useEffect(() => {
    if (!settings.display) {
      handleMediaSettingsChange('sequence', 0);
    } else {
      handleMediaSettingsChange('sequence', settings.sequence == 0 ? 1 : settings.sequence);
    }
  }, [settings.display])

  return (
    <div className="gridElement">
      <h3 className="font-bold text-l">Media Settings</h3>
      <label>
        Sequence:
        <input
          type="number"
          value={settings.sequence}
          onChange={(e) => {
            handleMediaSettingsChange('sequence', e.target.value);
          }
          }
          disabled={!settings.display} // Disable if 'Display' is unchecked
          min={1}
        />
      </label>
      
      {/* Deprecated since audio cannot be played on browser */}
      {/* <label className='checkbox'>
        Play with Audio:
        <input
          type="checkbox"
          checked={settings.audio}
          onChange={(e) => handleMediaSettingsChange('audio', e.target.checked)}
          disabled={!settings.display} // Disable if 'Display' is unchecked
        />
      </label> */}

      <label>
        Display:
        <input
          type="checkbox"
          checked={settings.display}
          onChange={(e) =>
            handleMediaSettingsChange('display', e.target.checked)
          }
        />
      </label>
      <label>
        Select Video:
        <div className='selectVideo'>
          <select value={selectedVideo || ''} onChange={handleVideoSelection}>
            {videoList ? videoList.map((video) => (
              <option key={video.id} value={video.url}>
                {video.url.split('/').pop()}
              </option>
            )) : (
              <p>No Videos Uploaded</p>
            )}
          </select>
        </div>
      </label>
      <label>
        Upload Video:
        <div className='upload'>
          <input type="file" accept="video/*" onChange={
            handleVideoUpload
          } />
        </div>
        
      </label>
    </div>
  );
};

export default MediaSettingsComponent;

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
      if (window.confirm(`Upload ${e.target.files?.[0].name}?`)){
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
  return (
    <div className="gridElement">
      <h3 className="font-bold text-l">Media Settings</h3>
      <label>
        Sequence:
        <input
          type="number"
          value={settings.display ? settings.sequence : ''}
          onChange={(e) => {
            const newValue = e.target.value !== '' ? parseInt(e.target.value) : null;
            handleMediaSettingsChange('sequence', newValue);
          }
          }
          disabled={!settings.display} // Disable if 'Display' is unchecked
          min={1}
        />
      </label>
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
        <select value={selectedVideo || ''} onChange={handleVideoSelection}>
          {videoList ? videoList.map((video) => (
            <option key={video.id} value={video.url}>
              {video.url.split('/').pop()}
            </option>
          )) : (
            <p>No Videos Uploaded</p>
          )}
        </select>
      </label>
      <label>
        Upload Video:
        <input type="file" accept="video/*" onChange={
            handleVideoUpload
          } />
      </label>
    </div>
  );
};

export default MediaSettingsComponent;

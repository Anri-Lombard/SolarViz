import React, { useEffect } from 'react';

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
}

const MediaSettingsComponent: React.FC<MediaSettingsProps> = ({ handleMediaSettingsChange, settings }) => {

  useEffect(() => {
    // Listen for changes to settings[chartType].display
    if (!settings.display) {
      // If display is unchecked, reset sequence to 0 and audio to false
      handleMediaSettingsChange('audio', false);
      handleMediaSettingsChange('sequence', 0);
    }
  }, [settings.display]);

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
      
      <label className='checkbox'>
        Play with Audio:
        <input
          type="checkbox"
          checked={settings.audio}
          onChange={(e) => handleMediaSettingsChange('audio', e.target.checked)}
          disabled={!settings.display} // Disable if 'Display' is unchecked
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
    </div>
  );
};

export default MediaSettingsComponent;

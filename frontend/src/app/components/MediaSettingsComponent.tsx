import React from 'react';

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

/**
 * MediaSettingsComponent displays settings for media playback.
 *
 * @param {MediaSettingsProps} props                  The component's props.
 * @param {Function} props.handleMediaSettingsChange  A function to handle changes in media settings.
 * @param {Object} props.settings                     The media settings object.
 * @returns {JSX.Element}                             The MediaSettingsComponent JSX.
 */

const MediaSettingsComponent: React.FC<MediaSettingsProps> = ({ handleMediaSettingsChange, settings }) => (
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
      />
    </label>
    <label>
      Display:
      <input
        type="checkbox"
        checked={settings.display}
        onChange={(e) => handleMediaSettingsChange('display', e.target.checked)}
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
  </div>
);

export default MediaSettingsComponent;

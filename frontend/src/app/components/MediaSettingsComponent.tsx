import React from 'react';

interface MediaSettingsProps {
  handleMediaSettingsChange: (field: string, value: any) => void;
  settings: {
    sequence: number;
    display: boolean;
    audio: boolean;
  };
}

const MediaSettingsComponent: React.FC<MediaSettingsProps> = ({ handleMediaSettingsChange, settings }) => {

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
};

export default MediaSettingsComponent;

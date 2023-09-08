import React from 'react';

interface MediaSettingsProps {
  handleMediaSettingsChange: (field: string, value: any) => void;
  settings: {
    sequence: number;
    display: boolean;
    audio: boolean;
  };
}

const MediaSettingsComponent: React.FC<MediaSettingsProps> = ({ handleMediaSettingsChange, settings }) => (
  <div className="gridElement">
    <h3 className="font-bold text-l">Media Settings</h3>
    <label>
      Sequence:
      <input
        type="number"
        value={settings.sequence}
        onChange={(e) => handleMediaSettingsChange('sequence', parseInt(e.target.value))}
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
      />
    </label>
  </div>
);

export default MediaSettingsComponent;

import React from 'react';
import { GraphSettingsProps } from '../types/dataTypes';

const GraphSettingsComponent: React.FC<GraphSettingsProps> = ({ chartType, handleGraphSettingsChange, settings }) => {

  const handleDisplayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const newSequence = isChecked ? settings[chartType].sequence : null; // Set sequence to null if not checked
    handleGraphSettingsChange(chartType, 'display', newSequence);
  };

  return (
    <div className="gridElement">
      <h3 className="font-bold text-l">{chartType}</h3>
      <label>
        Sequence:
        <input
          type="number"
          value={settings[chartType].sequence}
          onChange={(e) => handleGraphSettingsChange(chartType, 'sequence', parseInt(e.target.value))}
          disabled={!settings[chartType].display} // Disable if 'Display' is unchecked
        />
      </label>
      <label>
        Duration (seconds):
        <input
          type="number"
          value={settings[chartType].duration}
          onChange={(e) => handleGraphSettingsChange(chartType, 'duration', parseInt(e.target.value))}
          disabled={!settings[chartType].display} // Disable if 'Display' is unchecked
        />
      </label>
      <label className='checkbox'>
        Display:
        <input
          type="checkbox"
          checked={settings[chartType].display}
          onChange={handleDisplayChange}
        />
      </label>
    </div>
  );
}

export default GraphSettingsComponent;

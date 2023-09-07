// GraphSettingsComponent.tsx

import React from 'react';
import { GraphSettingsProps } from '../types/dataTypes';

const GraphSettingsComponent: React.FC<GraphSettingsProps> = ({ chartType, handleGraphSettingsChange, settings }) => (
  <div className="gridElement">
    <h3 className="font-bold text-l">{chartType}</h3>
    <label>
      Sequence:
      <input
        type="number"
        value={settings[chartType].sequence}
        onChange={(e) => handleGraphSettingsChange(chartType, 'sequence', parseInt(e.target.value))}
      />
    </label>
    <label>
      Duration (seconds):
      <input
        type="number"
        value={settings[chartType].duration}
        onChange={(e) => handleGraphSettingsChange(chartType, 'duration', parseInt(e.target.value))}
      />
    </label>
    <label className='checkbox'>
      Display:
      <input
        type="checkbox"
        checked={settings[chartType].display}
        onChange={(e) => handleGraphSettingsChange(chartType, 'display', e.target.checked)}
      />
    </label>
  </div>
);

export default GraphSettingsComponent;

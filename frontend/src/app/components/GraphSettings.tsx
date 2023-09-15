import { GraphSettingsProps } from '../types/dataTypes';
import React, { useState, useEffect } from 'react';
import '../styles/GraphSettings.css';
import Image from 'next/image';
import pie from '../images/piechart.png';
import line from '../images/linechart.png';
import area from '../images/areachart.png';

const GraphSettingsComponent: React.FC<GraphSettingsProps> = ({ chartType, handleGraphSettingsChange, settings }) => {

  const [sequenceValue, setSequenceValue] = useState(settings[chartType].sequence); //for managing sequence value changes when display is disabled

  useEffect(() => {
    // Listen for changes to settings[chartType].display
    if (!settings[chartType].display) {
      // If display is unchecked, reset sequence to 0
      setSequenceValue(0);
      handleGraphSettingsChange(chartType, 'sequence', 0);
    }
  }, [settings[chartType].display]);

  return (
    <div className="gridElement">
      <div className="graphHeading">
        <h3 className="font-bold text-l">{chartType}</h3>
        <Image
          src={chartType === 'pieChart' ? pie : chartType === 'lineChart' ? line : area}
          alt="chartImage"
          className='chartImage'
        />
      </div>
      
      <label>
        Sequence:
        <input
          type="number"
          value={settings[chartType].display ? settings[chartType].sequence : 0}
          onChange={(e) => {
            const newValue = e.target.value !== '' ? parseInt(e.target.value) : 0;
            setSequenceValue(newValue); //update local state
            handleGraphSettingsChange(chartType, 'sequence', newValue);
          }}
          disabled={!settings[chartType].display} // Disable if 'Display' is unchecked
        />
      </label>
      <label>
        Duration (seconds):
        <input
          type="number"
          value={settings[chartType].duration}
          onChange={(e) => handleGraphSettingsChange(chartType, 'duration', parseInt(e.target.value))
          }
          disabled={!settings[chartType].display} // Disable if 'Display' is unchecked
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
}

export default GraphSettingsComponent;

import { GraphSettingsProps } from '../types/dataTypes';
import React, { useState, useEffect } from 'react';
import '../styles/GraphSettings.css';
import Image from 'next/image';

/**
 * GraphSettingsComponent displays settings for a specific chart type.
 *
 * @param {GraphSettingsProps} props                  The component's props.
 * @param {string} props.chartType                    The type of chart.
 * @param {Function} props.handleGraphSettingsChange  A function to handle changes in graph settings.
 * @param {Object} props.settings                     The settings for the chart type.
 * @returns {JSX.Element}                             The GraphSettingsComponent JSX.
 */

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
          src={chartType === 'pieChart' ? "/images/piechart.png" : chartType === 'lineChart' ? "/images/linechart.png" : "/images/areachart.png"}
          alt="chartImage"
          className='chartImage'
          width={100}
          height={100}
        />
      </div>
      
      <label>
        Sequence:
        <input
          data-testid={chartType === 'pieChart' ? "pieChart-sequence" : chartType === 'lineChart' ? "lineChart-sequence" : "areaChart-sequence"}
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
          data-testid={chartType === 'pieChart' ? "pieChart-display" : chartType === 'lineChart' ? "lineChart-display" : "areaChart-display"}
          type="checkbox"
          checked={settings[chartType].display}
          onChange={(e) => handleGraphSettingsChange(chartType, 'display', e.target.checked)}
        />
      </label>
    </div>
  );
}

export default GraphSettingsComponent;

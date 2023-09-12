import React from 'react';
import { GraphSettingsProps } from '../types/dataTypes';

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

  return (
    <div className="gridElement">
      <h3 className="font-bold text-l">{chartType}</h3>
      <label>
        Sequence:
        <input
          type="number"
          value={settings[chartType].display ? settings[chartType].sequence : ''}
          onChange={(e) => {
            const newValue = e.target.value !== '' ? parseInt(e.target.value) : 0;
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
          onChange={(e) => handleGraphSettingsChange(chartType,'duration', parseInt(e.target.value))
          }
          disabled={!settings[chartType].display} // Disable if 'Display' is unchecked
        />
      </label>
      <label className='checkbox'>
        Display:
        <input
          type="checkbox"
          checked={settings[chartType].display}
          onChange={(e) => {
            handleGraphSettingsChange(chartType, 'display', e.target.checked);
          }}
        />
      </label>
    </div>
  );
}

export default GraphSettingsComponent;

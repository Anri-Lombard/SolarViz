import React from 'react';

import { ColorOptionsProps } from '../types/dataTypes';

/**
 * ColorOptions component displays a set of color options and allows the user to select a color.
 *
 * @param {ColorOptionsProps} props                                         The component's props.
 * @param {string} props.type                                               The type of color being displayed (e.g., "Background", "Text").
 * @param {string[]} props.colors                                           An array of available color options.
 * @param {(type: string, color: string) => void} props.handleChangeColor   A function to handle color change events.
 * @param {string} props.currentColor                                       The currently selected color.
 * @returns {JSX.Element}                                                   The ColorOptions component JSX.
 */

const ColorOptions: React.FC<ColorOptionsProps> = ({ type, colors, handleChangeColor, currentColor }) => (
  <div className="colorGridElement">
    <h3 className='text-black font-bold '>{type} Colour</h3>
    <div className="colorDropdown">
      <div
        style={{ backgroundColor: currentColor, width: '30px', height: '30px' }}
      ></div>
      <select
        value={currentColor}
        onChange={(e) => handleChangeColor(type, e.target.value)}
        className="p-2 m-0 mb-2"
      >
        {colors.map((color) => (
          <option
            key={color}
            value={color}
            style={{ backgroundColor:'#292827', color: 'white'}}
          >
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default ColorOptions;

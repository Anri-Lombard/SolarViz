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
  <div className="flex flex-col mb-5">
    <h3 className='text-black font-bold'>{type} Colour</h3>
    <div className="flex flex-wrap">
      <div
        className='p-2 m-1'
        style={{ backgroundColor: currentColor, width: '30px', height: '30px' }}
      ></div>
      {colors.map((color) => (
        <button
          key={color}
          onClick={() => handleChangeColor(type, color)}
          className={`p-2 m-1 ${currentColor === color ? 'bg-blue-500 text-white' : 'bg-gray-400 text-black'}`}
        >
          {color.charAt(0).toUpperCase() + color.slice(1)}
        </button>
      ))}
    </div>
  </div>
);

export default ColorOptions;


import React from 'react';

import { ColorOptionsProps } from '../types/dataTypes';

const ColorOptions: React.FC<ColorOptionsProps> = ({ type, colors, handleChangeColor, currentColor }) => (
  <div className="flex flex-col mb-5">
    <h3 className='text-black font-bold '>{type} Colour</h3>
    <div className="flex flex-wrap">
      <div
        className='p-2 m-1'
        style={{ backgroundColor: currentColor, width: '30px', height: '30px' }}
      ></div>
      <select
        value={currentColor}
        onChange={(e) => handleChangeColor(type, e.target.value)}
        className="p-2 m-1"
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
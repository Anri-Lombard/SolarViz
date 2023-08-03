import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 bg-blue-500 text-white p-3 rounded-br-lg shadow-md">
      <h1 className="text-xl font-bold text-white">SolarViz</h1>
    </div>
  );
};

export default Header;
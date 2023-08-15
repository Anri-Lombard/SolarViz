"use client"

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const Header: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams()
  const [showMenu, setShowMenu] = useState(false);

  const goToPage = (path: string) => {
    router.push(path);
    setShowMenu(false); // Close the menu after navigation
  };

  const isCurrentPage = (path: string) => {
    return searchParams.has(path);
  };

  return (
    <div className="fixed top-0 left-0 bg-blue-500 text-white p-3 rounded-br-lg shadow-md">
      <h1 className="text-xl font-bold text-white">SolarViz</h1>
      <button onClick={() => setShowMenu(!showMenu)}>Menu</button>
      {showMenu && (
        <div className="absolute top-full left-0  bg-white text-black p-3 rounded shadow-md">
          <button
            onClick={() => goToPage('/')}
            className={isCurrentPage('/') ? 'bg-blue-200' : ''}
          >
            Home
          </button>
          <button
            onClick={() => goToPage('/manual')}
            className={isCurrentPage('/manual') ? 'bg-blue-200' : ''}
          >
            Manual
          </button>
          <button
            onClick={() => goToPage('/admin')}
            className={isCurrentPage('/admin') ? 'bg-blue-200' : ''}
          >
            Admin
          </button>
          <button
            onClick={() => goToPage('/settings')}
            className={isCurrentPage('/settings') ? 'bg-blue-200' : ''}
          >
            Settings
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;

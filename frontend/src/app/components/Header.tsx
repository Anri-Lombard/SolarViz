"use client"

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import logoImage from '../images/logo.png';
import '../styles/LogoImage.css';
import Image from 'next/image';

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
    <div className="fixed top-5 right-0 p-3 rounded-br-lg shadow-md mr-2 text-white bg-black">
      
      <div className="logoContainer fixed top-0 left-0">
        <div
          onClick={() => goToPage('/')}
          className='logoWrapper'
        >
          <Image src={logoImage} alt="logo" className='logoImage'/>
        </div>
      </div>

      <button onClick={() => setShowMenu(!showMenu)}>Menu</button>

      {showMenu && (
        <div className="absolute top-full right-0 bg-white text-black p-3 rounded shadow-md m-5">
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

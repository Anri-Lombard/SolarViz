"use client"

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import logoImage from '../images/logo.png';
import '../styles/Header.css';
import Image from 'next/image';

const Header: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams()
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  const goToPage = (path: string) => {
    router.push(path);
  };

  return (
    <header className="header">
      <div 
        onMouseEnter={() => setIsLogoHovered(true)}
        onMouseLeave={() => setIsLogoHovered(false)}
        onClick={() => goToPage('/')} className="logoImage"
      >
        <Image src={logoImage} alt="logo" />
        {isLogoHovered && <div className="hoverText">Return to homepage</div>}
      </div>

      <div className='menuButtonContainer'>
        <div 
        onClick={() => goToPage('/admin')}
        className='menuButton'
        >
        Admin
        </div>

        <div
          onClick={() => goToPage('/settings')}
          className='menuButton'
        >
        Control Room
        </div>
      </div>
      
    </header>
  );
};

export default Header;

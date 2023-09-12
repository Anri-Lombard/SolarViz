"use client"

// Importing dependencies and custom components
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import logoImage from '../images/logo.png';
import lock from '../images/lock.png';
import unlock from '../images/unlock.png';
import '../styles/Header.css';
import Image from 'next/image';
import { useAuth } from '../contexts/LoginContext';

/**
 * Header component renders the header of the application.
 * It includes a logo that redirects to the homepage and menu buttons for navigation.
 * 
 * @returns {JSX.Element} The Header component JSX.
 */

const Header: React.FC = () => {
  // State and Hooks
  const router = useRouter();
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const { isLoggedIn } = useAuth();

  /**
   * Navigate to a specific page.
   * 
   * @param {string} path - The path to navigate to.
   */
  const goToPage = (path: string) => {
    router.push(path);
  };

  // Component Render
  return (
    <div className="header">

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
          onClick={() => goToPage('/moreData')}
          className='menuButton'
        >
          More data
        </div>

        <div
          onClick={() => goToPage('/login/admin')}
          className='menuButton'
        >
          Admin
          {isLoggedIn ? ( // Conditionally render the lock/unlock image
            <Image src={unlock} alt="Unlock" className='lockImage' />
          ) : (
            <Image src={lock} alt="Lock" className='lockImage' />
          )}
        </div>
      </div>

    </div>
  );
};

export default Header;

// Importing dependencies and custom components
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import footerImage from '../images/darkBulb.png';
import '../styles/Footer.css';

/**
 * Footer component renders the footer section of the application.
 * It includes a copyright text, a footer image, and a help button that redirects to the user manual.
 * @returns {JSX.Element} The Footer component JSX.
 */
export const Footer: React.FC = () => {
  const router = useRouter();
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  /**
   * Handles the click event on the help button and navigates to the user manual page.
   */
  
  const handleButtonClick = () => {
    router.push('/manual');
  };

  return (
    <footer className="footer">

      <div className='footerContainer'>
        <Image src={footerImage} alt="Footer Image" className='footerImage' />

        <div
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
          className='helpButton' onClick={handleButtonClick}
        >
          ?
          {isLogoHovered && <div className="hoverText">View user manual</div>}
        </div>
      </div>

    </footer>
  );
};

export default Footer;

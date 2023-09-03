import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../styles/Footer.css';
import Image from 'next/image';
import footerImage from '../images/darkbulb.png';

export const Footer: React.FC = () => {
  const router = useRouter();
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  const handleButtonClick = () => {
    router.push('/manual');
  };

  // get year dynamically
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className='footerText'>
        <p>© {year} SolarViz. All rights reserved.</p>
      </div>

      <div className='footerContainer'>
        <Image src={footerImage} alt = "Footer Image" className='footerImage'/>
        
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

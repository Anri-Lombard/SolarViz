import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../styles/Footer.css';

export const Footer: React.FC = () => {
  const router = useRouter();
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  const handleButtonClick = () => {
    router.push('/manual');
  };

  return (
    <footer className="footer">

      <div className='footerText'>
        <p>© 2023 SolarViz. All rights reserved.</p>
      </div>
      
      <div 
        onMouseEnter={() => setIsLogoHovered(true)}
        onMouseLeave={() => setIsLogoHovered(false)}
        className='helpButton' onClick={handleButtonClick}
      >
        ?
        {isLogoHovered && <div className="hoverText">View user manual</div>}
      </div>

    </footer>
  );
};

export default Footer;

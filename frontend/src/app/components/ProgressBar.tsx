import { useState, useEffect } from 'react';

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress((prevProgress) => prevProgress + 2);
      } else {
        clearInterval(interval); // Stop the interval when progress reaches 100%
      }
    }, 200); // Increase progress every 0.2 seconds

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [progress]);

  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar"
        style={{
          height: `${progress}%`,
          transition: 'height 1s ease', // Add a 1-second smooth transition
          textAlign: 'center'

        }}
   
        
      >
      </div>

      <div className="percentage-text">{progress}%</div>

    </div>
    
  );
};

export default ProgressBar;

import React from 'react';
import '../styles/LoadingSpinner.css';

/**
 * LoadingSpinner component displays a loading spinner.
 *
 * @returns {JSX.Element} The LoadingSpinner component JSX.
 */

const LoadingSpinner = () => {
  return (
    <div className="spinner-container" data-testid="loading-spinner">
        <div className="loading-spinner"></div>
    </div>
  )
};

export default LoadingSpinner;

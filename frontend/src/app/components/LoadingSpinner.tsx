import React from 'react';
import '../styles/LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="spinner-container" data-testid="loading-spinner">
        <div className="loading-spinner"></div>
    </div>
  )
};

export default LoadingSpinner;

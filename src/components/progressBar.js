// src/components/progressBar.js
import React from 'react';
import { calculateProgress } from '../utils/roadmapUtils';

const ProgressBar = ({ items }) => {
  const progress = calculateProgress(items);
  return (
    <div style={{
      width: '100%',
      backgroundColor: '#ecf0f1',
      borderRadius: '10px',
      overflow: 'hidden',
      height: '24px',
      boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
    }}>
      <div
        style={{
          width: `${progress}%`,
          height: '100%',
          backgroundColor: '#3498db',
          borderRadius: '10px',
          textAlign: 'center',
          lineHeight: '24px',
          color: 'white',
          fontSize: '0.9em',
          fontWeight: '500',
          transition: 'width 0.4s ease', // Плавный переход при изменении прогресса
        }}
      >
        {progress}%
      </div>
    </div>
  );
};

export default ProgressBar;
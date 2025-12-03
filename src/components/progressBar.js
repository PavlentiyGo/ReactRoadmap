import React from 'react';
import { calculateProgress } from '../utils/roadmapUtils';

const ProgressBar = ({ items }) => {
  const progress = calculateProgress(items);
  return (
    <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '4px', margin: '10px 0' }}>
      <div
        style={{
          width: `${progress}%`,
          height: '20px',
          backgroundColor: '#4caf50',
          borderRadius: '4px',
          textAlign: 'center',
          lineHeight: '20px',
          color: 'white',
          fontSize: '12px',
        }}
      >
        Прогресс: {progress}%
      </div>
    </div>
  );
};

export default ProgressBar;
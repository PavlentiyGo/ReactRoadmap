// src/components/roadmapLoader.js
import React from 'react';
import { loadRoadmapFromFile } from '../utils/roadmapUtils';

const RoadmapLoader = ({ onRoadmapLoad }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/json') {
      loadRoadmapFromFile(file)
        .then(roadmap => {
          onRoadmapLoad(roadmap);
        })
        .catch(error => {
          alert('Ошибка загрузки дорожной карты: ' + error.message);
        });
    } else {
      alert('Пожалуйста, выберите корректный JSON-файл.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
    }}>
      <label style={{
        display: 'inline-block',
        padding: '12px 24px',
        backgroundColor: '#3498db',
        color: 'white',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '1em',
        fontWeight: '500',
        transition: 'background-color 0.2s',
      }}>
        Выберите файл дорожной карты
        <input
          type="file"
          accept=".json"
          onChange={handleFileChange}
          style={{ display: 'none' }} // Скрываем стандартный input
        />
      </label>
    </div>
  );
};

export default RoadmapLoader;
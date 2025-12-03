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
    <div>
      <input type="file" accept=".json" onChange={handleFileChange} />
    </div>
  );
};

export default RoadmapLoader;
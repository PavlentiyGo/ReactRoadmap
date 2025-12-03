// src/components/roadmapCard.js
import React from 'react';

const getStatusStyle = (status) => {
  switch (status) {
    case 'completed':
      return { backgroundColor: '#4caf50', color: 'white' };
    case 'in-progress':
      return { backgroundColor: '#ff9800', color: 'white' };
    case 'not-started':
    default:
      return { backgroundColor: '#e0e0e0', color: 'black' };
  }
};

const getStatusText = (status) => {
  switch (status) {
    case 'completed':
      return 'Выполнено';
    case 'in-progress':
      return 'В работе';
    case 'not-started':
    default:
      return 'Не начато';
  }
};

const RoadmapCard = ({ item }) => { // --- Убран onClick
  // Добавим проверку на существование item
  if (!item) {
    console.error("Item is undefined in RoadmapCard");
    return <div>Некорректный элемент</div>;
  }

  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        margin: '8px',
        cursor: 'pointer', // --- Курсор указывает на кликабельность ---
        ...getStatusStyle(item.status),
      }}
    >
      <h3>{item.name}</h3>
      <p>{item.description || 'Описание отсутствует.'}</p>
      <div style={{ fontSize: '12px', marginTop: '8px' }}>
        Статус: {getStatusText(item.status)}
      </div>
    </div>
  );
};

export default RoadmapCard;
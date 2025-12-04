// src/components/roadmapCard.js
import React from 'react';

const getStatusStyle = (status) => {
  switch (status) {
    case 'completed':
      return { backgroundColor: '#2ecc71', color: 'white' };
    case 'in-progress':
      return { backgroundColor: '#f39c12', color: 'white' };
    case 'not-started':
    default:
      return { backgroundColor: '#ecf0f1', color: '#2c3e50' };
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

const RoadmapCard = ({ item }) => {
  if (!item) {
    console.error("Item is undefined in RoadmapCard");
    return <div>Некорректный элемент</div>;
  }

  return (
    <div
      style={{
        border: '1px solid #dfe6e9',
        borderRadius: '10px',
        padding: '20px',
        margin: '0', // Убираем внутренние отступы, т.к. теперь у main есть gap
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s', // Анимация при наведении
        ...getStatusStyle(item.status),
        minHeight: '150px', // Минимальная высота для равномерности
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2em' }}>{item.name}</h3>
        <p style={{ margin: '0 0 10px 0', fontSize: '0.95em', opacity: 0.9 }}>{item.description || 'Описание отсутствует.'}</p>
      </div>
      <div style={{ fontSize: '0.85em', marginTop: 'auto' }}>
        Статус: {getStatusText(item.status)}
      </div>
    </div>
  );
};

export default RoadmapCard;
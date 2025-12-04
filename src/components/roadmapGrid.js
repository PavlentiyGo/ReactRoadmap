// src/components/roadmapGrid.js
import React from 'react';
import RoadmapCard from './roadmapCard';
import { Link } from 'react-router-dom';

const RoadmapGrid = ({ items }) => {
  if (!items || !Array.isArray(items)) {
    console.error("Items is not an array:", items);
    return <div style={{ padding: '20px', textAlign: 'center' }}>Нет элементов для отображения.</div>;
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', // Адаптивная сетка карточек
      gap: '16px', // Отступ между карточками
      width: '100%',
    }}>
      {items.map(item => (
        <Link to={`/item/${item.id}`} key={item.id} style={{ textDecoration: 'none', color: 'inherit' }}>
          <RoadmapCard item={item} />
        </Link>
      ))}
    </div>
  );
};

export default RoadmapGrid;
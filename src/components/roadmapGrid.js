// src/components/roadmapGrid.js
import React from 'react';
import RoadmapCard from './roadmapCard';
import { Link } from 'react-router-dom'; // --- Импортируем Link

const RoadmapGrid = ({ items }) => {
  if (!items || !Array.isArray(items)) {
    console.error("Items is not an array:", items);
    return <div style={{ padding: '20px' }}>Нет элементов для отображения.</div>;
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {items.map(item => (
        // --- Оборачиваем RoadmapCard в Link ---
        <Link to={`/item/${item.id}`} key={item.id} style={{ textDecoration: 'none', color: 'inherit' }}>
          <RoadmapCard item={item} />
        </Link>
      ))}
    </div>
  );
};

export default RoadmapGrid;
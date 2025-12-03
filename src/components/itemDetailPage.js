// src/components/itemDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; // --- Добавлен Link

const ItemDetailPage = ({ roadmap, onSave }) => {
  const { itemId } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('not-started');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (roadmap && itemId) {
      const foundItem = roadmap.items.find(i => i.id === itemId);
      if (foundItem) {
        setItem(foundItem);
        setNote(foundItem.note || '');
        setStatus(foundItem.status || 'not-started');
        setDueDate(foundItem.dueDate || '');
      } else {
        console.error("Item not found for ID:", itemId);
        navigate('/');
      }
    }
  }, [roadmap, itemId, navigate]);

  const handleSave = () => {
    if (item) {
      const updatedItem = { ...item, note, status, dueDate };
      onSave(updatedItem);
      navigate('/');
    }
  };

  // handleCancel больше не нужна, так как используем Link

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

  if (!item) {
    return <div style={{ padding: '20px' }}>Загрузка...</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>{item.name}</h2>
      <p>{item.description}</p>

      <h4>Полезные ресурсы:</h4>
      <ul>
        {item.resources && item.resources.length > 0 ? (
          item.resources.map((res, idx) => (
            <li key={idx}>
              <a href={res.url} target="_blank" rel="noopener noreferrer">{res.name}</a>
            </li>
          ))
        ) : (
          <li>Ресурсы не предоставлены.</li>
        )}
      </ul>

      <h4>Ваша заметка:</h4>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Добавьте свои заметки здесь..."
        style={{ width: '100%', minHeight: '100px' }}
      />

      <h4>Статус:</h4>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="not-started">{getStatusText('not-started')}</option>
        <option value="in-progress">{getStatusText('in-progress')}</option>
        <option value="completed">{getStatusText('completed')}</option>
      </select>

      <h4>Планируемая дата завершения:</h4>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      {/* --- Кнопка "Назад к списку" как Link --- */}
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <Link
          to="/"
          style={{
            backgroundColor: '#6c757d',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '4px',
            textDecoration: 'none',
            cursor: 'pointer',
            border: 'none', // Убираем border, если он был
            fontSize: '1em',
          }}
        >
          Назад к списку
        </Link>
        <button
          onClick={handleSave}
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Сохранить
        </button>
      </div>
    </div>
  );
};

export default ItemDetailPage;
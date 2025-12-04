// src/components/itemDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

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
    return <div style={{ padding: '20px', textAlign: 'center' }}>Загрузка...</div>;
  }

  return (
    <div style={{
      padding: '30px',
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    }}>
      <h2 style={{ color: '#2c3e50' }}>{item.name}</h2>
      <p style={{ color: '#7f8c8d' }}>{item.description}</p>

      <h4 style={{ color: '#2c3e50', marginTop: '20px' }}>Полезные ресурсы:</h4>
      <ul>
        {item.resources && item.resources.length > 0 ? (
          item.resources.map((res, idx) => (
            <li key={idx}>
              <a href={res.url} target="_blank" rel="noopener noreferrer" style={{ color: '#3498db' }}>{res.name}</a>
            </li>
          ))
        ) : (
          <li>Ресурсы не предоставлены.</li>
        )}
      </ul>

      <h4 style={{ color: '#2c3e50', marginTop: '20px' }}>Ваша заметка:</h4>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Добавьте свои заметки здесь..."
        style={{
          width: '100%',
          minHeight: '120px',
          padding: '12px',
          borderRadius: '6px',
          border: '1px solid #bdc3c7',
          fontSize: '1em',
          fontFamily: 'inherit',
        }}
      />

      <div style={{ display: 'flex', gap: '20px', marginTop: '20px', alignItems: 'center' }}>
          <div>
              <h4 style={{ color: '#2c3e50', margin: '0 0 5px 0' }}>Статус:</h4>
              <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  style={{
                      padding: '8px 12px',
                      borderRadius: '4px',
                      border: '1px solid #bdc3c7',
                      fontSize: '1em',
                  }}
              >
                  <option value="not-started">{getStatusText('not-started')}</option>
                  <option value="in-progress">{getStatusText('in-progress')}</option>
                  <option value="completed">{getStatusText('completed')}</option>
              </select>
          </div>
          <div>
              <h4 style={{ color: '#2c3e50', margin: '0 0 5px 0' }}>Планируемая дата завершения:</h4>
              <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  style={{
                      padding: '8px',
                      borderRadius: '4px',
                      border: '1px solid #bdc3c7',
                      fontSize: '1em',
                  }}
              />
          </div>
      </div>

      <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between' }}>
        <Link
          to="/"
          style={{
            backgroundColor: '#95a5a6',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '6px',
            textDecoration: 'none',
            cursor: 'pointer',
            border: 'none',
            fontSize: '1em',
            fontWeight: '500',
            transition: 'background-color 0.2s',
          }}
        >
          Назад к списку
        </Link>
        <button
          onClick={handleSave}
          style={{
            backgroundColor: '#27ae60',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1em',
            fontWeight: '500',
            transition: 'background-color 0.2s',
          }}
        >
          Сохранить
        </button>
      </div>
    </div>
  );
};

export default ItemDetailPage;
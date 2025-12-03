import React, { useState, useEffect } from 'react';

const ItemDetailModal = ({ item, onClose, onSave }) => {
  const [note, setNote] = useState(item.note || '');
  const [status, setStatus] = useState(item.status || 'not-started');
  const [dueDate, setDueDate] = useState(item.dueDate || '');

  useEffect(() => {
    setNote(item.note || '');
    setStatus(item.status || 'not-started');
    setDueDate(item.dueDate || '');
  }, [item]);

  const handleSave = () => {
    const updatedItem = { ...item, note, status, dueDate };
    onSave(updatedItem);
    onClose();
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

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '80%',
        maxWidth: '600px',
        maxHeight: '90vh',
        overflowY: 'auto',
      }}>
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

        {/* Перевод: "Your Note:" -> "Ваша заметка:" */}
        <h4>Ваша заметка:</h4>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Добавьте свои заметки здесь..."
          style={{ width: '100%', minHeight: '100px' }}
        />

        {/* Перевод: "Status:" -> "Статус:" */}
        <h4>Статус:</h4>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="not-started">{getStatusText('not-started')}</option>
          <option value="in-progress">{getStatusText('in-progress')}</option>
          <option value="completed">{getStatusText('completed')}</option>
        </select>

        {/* Перевод: "Due Date:" -> "Планируемая дата завершения:" */}
        <h4>Планируемая дата завершения:</h4>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
          {/* Перевод: "Cancel" -> "Отмена" */}
          <button onClick={onClose}>Отмена</button>
          {/* Перевод: "Save" -> "Сохранить" */}
          <button onClick={handleSave}>Сохранить</button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailModal;
// src/App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import RoadmapLoader from './components/roadmapLoader';
import ProgressBar from './components/progressBar';
import RoadmapGrid from './components/roadmapGrid';
import ItemDetailPage from './components/itemDetailPage';
import { exportRoadmapToFile } from './utils/roadmapUtils';

const App = () => {
  const [roadmap, setRoadmap] = useState(null);
  const [filter, setFilter] = useState('all');

  const handleRoadmapLoad = (loadedRoadmap) => {
    const itemsWithDefaults = loadedRoadmap.items.map(item => ({
      ...item,
      status: item.status || 'not-started',
      dueDate: item.dueDate || '',
      note: item.note || '',
      startDate: item.startDate || '',
    }));
    setRoadmap({ ...loadedRoadmap, items: itemsWithDefaults });
  };

  const handleItemSave = (updatedItem) => {
    setRoadmap(prevRoadmap => {
      if (!prevRoadmap) return null;
      const updatedItems = prevRoadmap.items.map(item => {
        if (item.id === updatedItem.id && updatedItem.status === 'in-progress' && !item.startDate) {
          updatedItem.startDate = new Date().toISOString().split('T')[0];
        }
        return item.id === updatedItem.id ? updatedItem : item;
      });
      return { ...prevRoadmap, items: updatedItems };
    });
  };

  const handleExport = () => {
    if (roadmap) {
      exportRoadmapToFile(roadmap);
    }
  };

  // Фильтрация элементов
  const filteredItems = roadmap?.items.filter(item => {
    if (filter === 'all') return true;
    return item.status === filter;
  }) || [];

  // Подсчет статистики
  const stats = {
    total: roadmap?.items.length || 0,
    completed: roadmap?.items.filter(i => i.status === 'completed').length || 0,
    inProgress: roadmap?.items.filter(i => i.status === 'in-progress').length || 0,
    notStarted: roadmap?.items.filter(i => i.status === 'not-started').length || 0,
  };

  if (!roadmap) {
    return (
      <div style={styles.container}>
        <h1 style={styles.header}>Трекер Дорожной Карты</h1>
        <p style={styles.description}>Пожалуйста, загрузите JSON-файл с дорожной картой.</p>
        <RoadmapLoader onRoadmapLoad={handleRoadmapLoad} />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* --- Основные маршруты --- */}
      <Routes>
        {/* --- Главная страница --- */}
        <Route path="/" element={
          <>
            <header style={styles.headerSection}>
              <h1 style={styles.header}>{roadmap.title}</h1>
              <p style={styles.description}>{roadmap.description}</p>
              <div style={styles.controls}>
                {/* Кнопка "Назад к списку" здесь не нужна, так как мы уже на главной */}
                <button onClick={handleExport} style={styles.button}>
                  Экспортировать дорожную карту
                </button>
              </div>
            </header>

            <section style={styles.statsSection}>
              <div style={styles.statBox}>
                <h3>Всего</h3>
                <p>{stats.total}</p>
              </div>
              <div style={styles.statBox}>
                <h3>Выполнено</h3>
                <p>{stats.completed}</p>
              </div>
              <div style={styles.statBox}>
                <h3>В работе</h3>
                <p>{stats.inProgress}</p>
              </div>
              <div style={styles.statBox}>
                <h3>Не начато</h3>
                <p>{stats.notStarted}</p>
              </div>
            </section>

            <section style={styles.progressBarSection}>
              <ProgressBar items={roadmap.items} />
            </section>

            <section style={styles.filterSection}>
              <label>Фильтр: </label>
              <select value={filter} onChange={(e) => setFilter(e.target.value)} style={styles.select}>
                <option value="all">Все</option>
                <option value="not-started">Не начато</option>
                <option value="in-progress">В работе</option>
                <option value="completed">Выполнено</option>
              </select>
            </section>

            <main style={styles.main}>
              <RoadmapGrid items={filteredItems} />
            </main>
          </>
        } />

        {/* --- Детальная страница --- */}
        <Route path="/item/:itemId" element={
          <ItemDetailPage roadmap={roadmap} onSave={handleItemSave} />
        } />
      </Routes>
    </div>
  );
};

// Стили остаются без изменений
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  headerSection: {
    marginBottom: '20px',
    borderBottom: '2px solid #ccc',
    paddingBottom: '10px',
  },
  header: {
    fontSize: '2em',
    margin: 0,
    color: '#333',
  },
  description: {
    fontSize: '1.1em',
    color: '#666',
    margin: '10px 0',
  },
  controls: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '10px',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1em',
  },
  statsSection: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  statBox: {
    backgroundColor: '#f8f9fa',
    border: '1px solid #dee2e6',
    borderRadius: '4px',
    padding: '15px',
    textAlign: 'center',
    minWidth: '120px',
    margin: '5px',
  },
  progressBarSection: {
    marginBottom: '20px',
  },
  filterSection: {
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
  },
  select: {
    marginLeft: '10px',
    padding: '5px',
    fontSize: '1em',
  },
  main: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

export default App;
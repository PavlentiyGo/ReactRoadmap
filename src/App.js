// src/App.js
import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import RoadmapLoader from './components/roadmapLoader';
import ProgressBar from './components/progressBar';
import RoadmapGrid from './components/roadmapGrid';
import ItemDetailPage from './components/itemDetailPage.js';
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

  if (!roadmap) {
    return (
      <div style={styles.container}>
        <h1 style={styles.header}>Трекер Дорожной Карты</h1>
        <p style={styles.description}>Пожалуйста, загрузите JSON-файл с дорожной картой.</p>
        <RoadmapLoader onRoadmapLoad={handleRoadmapLoad} />
      </div>
    );
  }

  // --- Логика фильтрации теперь находится внутри маршрута / ---
  const filteredItems = roadmap?.items.filter(item => {
    if (filter === 'all') return true;
    return item.status === filter;
  }) || [];

  const stats = {
    total: roadmap?.items.length || 0,
    completed: roadmap?.items.filter(i => i.status === 'completed').length || 0,
    inProgress: roadmap?.items.filter(i => i.status === 'in-progress').length || 0,
    notStarted: roadmap?.items.filter(i => i.status === 'not-started').length || 0,
  };

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
              {/* --- Передаем отфильтрованные items --- */}
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

const styles = {
  container: {
    padding: '20px 40px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    maxWidth: '1400px',
    margin: '0 auto',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    minHeight: '100vh',
  },
  headerSection: {
    marginBottom: '20px',
    borderBottom: '1px solid #eaecef',
    paddingBottom: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px 8px 0 0',
    padding: '15px',
  },
  header: {
    fontSize: '2.2em',
    margin: '0 0 10px 0',
    color: '#2c3e50',
  },
  description: {
    fontSize: '1.1em',
    color: '#7f8c8d',
    margin: '5px 0',
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '15px',
  },
  button: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1em',
    fontWeight: '500',
    transition: 'background-color 0.2s',
  },
  linkButton: {
    backgroundColor: '#95a5a6',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '1em',
    fontWeight: '500',
    transition: 'background-color 0.2s',
  },
  statsSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '15px',
    marginBottom: '20px',
  },
  statBox: {
    backgroundColor: '#ecf0f1',
    border: '1px solid #d5dbdb',
    borderRadius: '8px',
    padding: '15px',
    textAlign: 'center',
    transition: 'transform 0.2s',
  },
  statBoxH3: {
    margin: '0 0 5px 0',
    fontSize: '1em',
    color: '#7f8c8d',
  },
  statBoxP: {
    margin: '0',
    fontSize: '1.5em',
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  progressBarSection: {
    marginBottom: '20px',
  },
  filterSection: {
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  select: {
    padding: '8px 12px',
    fontSize: '1em',
    borderRadius: '4px',
    border: '1px solid #bdc3c7',
    backgroundColor: '#fff',
  },
  main: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
  },
};

export default App;
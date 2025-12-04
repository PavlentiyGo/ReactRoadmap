// src/utils/roadmapUtils.js

export const loadRoadmapFromFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const roadmap = JSON.parse(e.target.result);
        resolve(roadmap);
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsText(file);
  });
};

// --- Обновленная функция экспорта ---
export const exportRoadmapToFile = (roadmap, filename = 'roadmap.json') => {
  try {
    // Проверяем, что roadmap существует
    if (!roadmap) {
      console.error("Невозможно экспортировать: roadmap отсутствует.");
      alert("Невозможно экспортировать: данные дорожной карты отсутствуют.");
      return;
    }

    // Сериализуем объект в JSON с отступами для читаемости
    const dataStr = JSON.stringify(roadmap, null, 2);
    if (dataStr === undefined || dataStr === "undefined") {
      console.error("Сериализация roadmap в строку не удалась.");
      alert("Ошибка при подготовке данных для экспорта.");
      return;
    }

    // Создаем Blob из строки данных
    const dataBlob = new Blob([dataStr], { type: 'application/json' });

    // --- Используем URL.createObjectURL вместо data URI ---
    const url = URL.createObjectURL(dataBlob);

    // Создаем временный элемент <a>
    const link = document.createElement('a');
    link.href = url;
    link.download = filename; // Устанавливаем имя файла

    // Добавляем элемент в DOM, кликаем и удаляем
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // --- Очень важно: освобождаем созданный URL ---
    URL.revokeObjectURL(url);

  } catch (error) {
    console.error("Ошибка при экспорте дорожной карты: ", error);
    alert("Произошла ошибка при попытке экспорта файла: " + error.message);
  }
};

export const calculateProgress = (items) => {
  if (!items || items.length === 0) return 0;
  const completed = items.filter(item => item.status === 'completed').length;
  return Math.round((completed / items.length) * 100);
};
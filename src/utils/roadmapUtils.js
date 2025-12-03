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

export const exportRoadmapToFile = (roadmap, filename = 'roadmap.json') => {
  const dataStr = JSON.stringify(roadmap, null, 2);
  const dataUri = 'application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

  const link = document.createElement('a');
  link.setAttribute('href', dataUri);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const calculateProgress = (items) => {
  if (!items || items.length === 0) return 0;
  const completed = items.filter(item => item.status === 'completed').length;
  return Math.round((completed / items.length) * 100);
};
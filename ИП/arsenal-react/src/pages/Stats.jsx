import React from 'react';
import { useWeapons } from '../hooks/useWeapons';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import background from '../assets/stats-bg.png'; // фон 3D-сетка

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Stats() {
  const { weapons } = useWeapons();

  const totalWeapons = weapons.length;
  const purchasedWeapons = weapons.filter(w => w.purchased).length;
  const totalComments = weapons.reduce((sum, w) => sum + (w.comments?.length || 0), 0);

  const categoriesCount = weapons.reduce((acc, w) => {
    acc[w.category] = (acc[w.category] || 0) + 1;
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(categoriesCount),
    datasets: [
      {
        label: 'Количество',
        data: Object.values(categoriesCount),
        backgroundColor: ['#0d6efd', '#198754', '#ffc107'],
        borderWidth: 1
      }
    ]
  };

  return (
    <div
      className="position-relative"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        paddingTop: '4rem',
        paddingBottom: '4rem'
      }}
    >
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 0
      }}></div>

      <div className="container position-relative z-1 text-white">
        <div className="p-4 rounded-4 bg-dark bg-opacity-75">
          <h2 className="mb-4">📊 Статистика оружия</h2>

          <ul className="list-group mb-4">
            <li className="list-group-item bg-light text-dark">Всего оружия: <strong>{totalWeapons}</strong></li>
            <li className="list-group-item bg-light text-dark">Приобретено: <strong>{purchasedWeapons}</strong></li>
            <li className="list-group-item bg-light text-dark">Всего комментариев: <strong>{totalComments}</strong></li>
          </ul>

          <h5 className="mt-4 mb-3">📦 Распределение по категориям:</h5>
          <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <Pie data={pieData} />
          </div>

          <p className="mt-4 small" style={{ color: 'white' }}>
            Последнее обновление статистики: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}

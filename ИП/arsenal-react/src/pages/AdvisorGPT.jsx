// src/pages/Advisor.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../assets/ai-assistant-bg.jpg';

export default function Advisor() {
  const [form, setForm] = useState({ experience: '', goal: '', priority: '' });
  const [result, setResult] = useState('');
  const [resultName, setResultName] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { experience, goal, priority } = form;
    let suggestion = 'На основе ваших ответов мы рекомендуем: ';

    if (goal === 'collection') {
      setResultName('Desert Eagle');
      suggestion += '🗃 Desert Eagle — впечатляющий и редкий экземпляр.';
    } else if (goal === 'selfdefense' && experience === 'beginner') {
      setResultName('Glock 17');
      suggestion += '🔫 Glock 17 — лёгкий, точный и простой в использовании.';
    } else if (goal === 'combat' && priority === 'power') {
      setResultName('АК-47');
      suggestion += '💥 АК-47 — надёжный и мощный автомат.';
    } else if (goal === 'combat' && priority === 'light') {
      setResultName('Karambit');
      suggestion += '🔪 Karambit — удобен в ближнем бою.';
    } else {
      setResultName('Bayonet Knife');
      suggestion += '⚔ Bayonet Knife — универсальный и практичный выбор.';
    }

    setResult(suggestion);
  };

  return (
    <div
      className="position-relative"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        paddingTop: '5rem',
        paddingBottom: '5rem'
      }}
    >
      {/* Пелена */}
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{
        backgroundColor: 'rgba(0,0,0,0.55)',
        zIndex: 0
      }}></div>

      <div className="container position-relative z-1 text-white">
        <div className="bg-dark bg-opacity-75 p-4 rounded-4 shadow">
          <h2 className="mb-4 text-center">🤖 Подбор оружия</h2>
          <form onSubmit={handleSubmit} className="row g-3 mb-3">
            <div className="col-md-4">
              <label className="form-label">Ваш опыт</label>
              <select className="form-select" name="experience" onChange={handleChange} required>
                <option value="">Выберите...</option>
                <option value="beginner">Новичок</option>
                <option value="expert">Опытный</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">Цель</label>
              <select className="form-select" name="goal" onChange={handleChange} required>
                <option value="">Выберите...</option>
                <option value="selfdefense">Самооборона</option>
                <option value="collection">Коллекция</option>
                <option value="combat">Ближний бой</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">Что важнее?</label>
              <select className="form-select" name="priority" onChange={handleChange} required>
                <option value="">Выберите...</option>
                <option value="light">Лёгкость</option>
                <option value="power">Мощность</option>
              </select>
            </div>

            <div className="col-12 text-center">
              <button type="submit" className="btn btn-primary">Подобрать</button>
            </div>
          </form>

          {result && (
            <div className="card mt-4 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">🔍 Результат подбора</h5>
                <p className="card-text">{result}</p>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => navigate('/catalog', { state: { highlight: resultName } })}
                >
                  Перейти в каталог
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

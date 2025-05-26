import React, { useState } from 'react';
import { useWeapons } from '../hooks/useWeapons';
import { useNavigate } from 'react-router-dom';
import background from '../assets/add-bg.png'; // убедись, что файл существует

export default function AddWeapon() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const { addWeapon } = useWeapons();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !category) return alert('Все поля обязательны');
    await addWeapon({ name, description, category });
    navigate('/catalog');
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
        paddingBottom: '5rem',
      }}
    >
      {/* Полупрозрачная пелена */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', zIndex: 0 }}
      ></div>

      {/* Контейнер формы */}
      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div className="bg-white p-4 rounded shadow" style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 className="mb-4 text-center">Добавление оружия</h2>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Название"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Описание"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Выберите категорию</option>
                <option value="Пистолет">Пистолет</option>
                <option value="Автомат">Автомат</option>
                <option value="Нож">Нож</option>
              </select>
            </div>
            <div className="col-12 text-center">
              <button type="submit" className="btn btn-success">
                Сохранить <i className="bi bi-check-circle"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

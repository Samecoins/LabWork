// src/pages/AddWeapon.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeapons } from '../hooks/useWeapons';
import { useCategories } from '../hooks/useCategories';

export default function AddWeapon() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const { addWeapon } = useWeapons();
  const { categories, loading: catLoading } = useCategories();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !categoryId) {
      return alert('Все поля обязательны');
    }
    await addWeapon({ name, description, categoryId });
    navigate('/catalog', { state: { highlight: name } });
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Добавление оружия</h2>

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

        <div className="col-md-3">
          <select
            className="form-select"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            disabled={catLoading}
          >
            <option value="">Выберите категорию</option>
            {!catLoading &&
              categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>

        <div className="col-md-1 d-grid">
          <button type="submit" className="btn btn-success">
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
}

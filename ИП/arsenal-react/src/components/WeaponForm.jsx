// src/components/WeaponForm.jsx

import React, { useState, useEffect } from 'react';

export default function WeaponForm({ onSubmit, initialData }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setDescription(initialData.description || '');
      setCategory(initialData.category || '');
    } else {
      setName('');
      setDescription('');
      setCategory('');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !category) return alert('Все поля обязательны');

    onSubmit({ id: initialData?.id, name, description, category });
    setName('');
    setDescription('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3 mb-4">
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
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Выберите категорию</option>
          <option value="Пистолет">Пистолет</option>
          <option value="Автомат">Автомат</option>
          <option value="Нож">Нож</option>
        </select>
      </div>
      <div className="col-md-1 d-grid">
        <button type="submit" className="btn btn-success">
          {initialData ? 'Обновить' : 'Добавить'}
        </button>
      </div>
    </form>
  );
}

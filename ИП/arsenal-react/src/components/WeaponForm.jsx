// src/components/WeaponForm.jsx
import React, { useEffect, useState } from 'react';

export default function WeaponForm({
  onSubmit,
  initialData,
  categories,
  categoriesLoading,
}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setDescription(initialData.description || '');
      setCategoryId(initialData.categoryId || initialData.category?.id || '');
    } else {
      setName('');
      setDescription('');
      setCategoryId('');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !categoryId) {
      return alert('Все поля обязательны');
    }

    onSubmit({
      id: initialData?.id,
      name,
      description,
      categoryId,
      purchased: initialData?.purchased ?? false,
    });
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
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          disabled={categoriesLoading}
        >
          <option value="">Выберите категорию</option>
          {!categoriesLoading &&
            categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
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

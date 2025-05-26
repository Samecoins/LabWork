import React, { useState, useEffect } from 'react';

function WeaponForm({ onSubmit, initialData }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
      setCategory(initialData.category);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id: initialData?.id, name, description, category });
    setName('');
    setDescription('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit} className="form mb-3">
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Название" className="form-control mb-2" required />
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Описание" className="form-control mb-2" required />
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-select mb-2" required>
        <option value="">Выберите категорию</option>
        <option value="Пистолет">Пистолет</option>
        <option value="Автомат">Автомат</option>
        <option value="Нож">Нож</option>
      </select>
      <button className="btn btn-success" type="submit">
        {initialData ? 'Обновить' : 'Добавить'} оружие
      </button>
    </form>
  );
}

export default WeaponForm;

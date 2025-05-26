import React, { useState } from 'react';
import WeaponList from './components/WeaponList';
import WeaponForm from './components/WeaponForm';

function App() {
  const [weapons, setWeapons] = useState([]);
  const [editingWeapon, setEditingWeapon] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('Все');

  const handleAdd = (weapon) => {
    setWeapons([...weapons, { ...weapon, id: Date.now(), comments: [] }]);
  };

  const handleDelete = (id) => {
    setWeapons(weapons.filter(w => w.id !== id));
  };

  const handleEdit = (weapon) => {
    setEditingWeapon(weapon);
  };

  const handleUpdate = (updatedWeapon) => {
    setWeapons(weapons.map(w => (w.id === updatedWeapon.id ? updatedWeapon : w)));
    setEditingWeapon(null);
  };

  const filteredWeapons = weapons.filter(w => {
    const matchesSearch = w.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'Все' || w.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container">
      <h1 className="mb-4">Арсенал Времени ⚔️</h1>

      <WeaponForm
        onSubmit={editingWeapon ? handleUpdate : handleAdd}
        initialData={editingWeapon}
      />

      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Поиск по названию..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="Все">Все категории</option>
            <option value="Пистолет">Пистолет</option>
            <option value="Автомат">Автомат</option>
            <option value="Нож">Нож</option>
          </select>
        </div>
        <div className="col-md-2 d-flex align-items-center">
          <span className="ms-2">Всего: {filteredWeapons.length}</span>
        </div>
      </div>

      <WeaponList
        weapons={filteredWeapons}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default App;

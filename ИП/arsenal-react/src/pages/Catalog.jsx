// src/pages/Catalog.jsx
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWeapons } from '../hooks/useWeapons';
import { useCategories } from '../hooks/useCategories';
import WeaponCard from '../components/WeaponCard';
import WeaponForm from '../components/WeaponForm';

export default function Catalog() {
  const {
    weapons,
    loading,
    deleteWeapon,
    updateWeapon,
    addComment,
    purchaseWeapon,
  } = useWeapons();

  const {
    categories,
    loading: catLoading,
  } = useCategories();

  const [search, setSearch] = useState('');
  const [filterCategoryId, setFilterCategoryId] = useState('ALL');
  const [selectedWeapon, setSelectedWeapon] = useState(null);

  const location = useLocation();
  const highlightName = location.state?.highlight || '';

  useEffect(() => {
    if (highlightName) {
      setSearch(highlightName);
    }
  }, [highlightName]);

  const categoryOptions = [{ id: 'ALL', name: 'Все категории' }, ...categories];

  const filteredWeapons = weapons.filter((w) => {
    const matchesCategory =
      filterCategoryId === 'ALL' || w.categoryId === filterCategoryId;

    const matchesSearch = w.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleEdit = (weapon) => setSelectedWeapon(weapon);

  const handleFormSubmit = async (formData) => {
    if (selectedWeapon) {
      await updateWeapon({ ...selectedWeapon, ...formData });
      setSelectedWeapon(null);
    }
  };

  const categoryNameById = (id) => {
    const found = categories.find((c) => c.id === id);
    return found ? found.name : 'Без категории';
  };

  return (
    <div className="container py-4">
      <div className="mb-4 d-flex flex-column flex-md-row justify-content-between gap-2">
        <h2 className="mb-0">Каталог оружия</h2>
        <Link
          to="/add"
          className="btn btn-success d-flex align-items-center gap-1"
        >
          <i className="bi bi-plus-circle" />
          <span>Добавить оружие</span>
        </Link>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Поиск по названию..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={filterCategoryId}
            onChange={(e) => setFilterCategoryId(e.target.value)}
            disabled={catLoading}
          >
            {categoryOptions.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-2 d-flex align-items-center">
          <span className="ms-2">Всего: {filteredWeapons.length}</span>
        </div>
      </div>

      {selectedWeapon && (
        <WeaponForm
          onSubmit={handleFormSubmit}
          initialData={selectedWeapon}
          categories={categories}
          categoriesLoading={catLoading}
        />
      )}

      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <div className="row">
          {filteredWeapons.map((w) => (
            <div key={w.id} className="col-md-6 col-lg-4 mb-3">
              <WeaponCard
                weapon={w}
                categoryName={categoryNameById(w.categoryId)}
                onEdit={handleEdit}
                onDelete={deleteWeapon}
                onPurchase={purchaseWeapon}
                onAddComment={addComment}
                highlightName={highlightName}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

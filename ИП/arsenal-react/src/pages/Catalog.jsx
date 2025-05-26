import { useWeapons } from '../hooks/useWeapons';
import { useState, useEffect } from 'react';
import WeaponCard from '../components/WeaponCard';
import { Link, useLocation } from 'react-router-dom';
import WeaponForm from '../components/WeaponForm';
import bg from '../assets/catalog-bg.png'; 

export default function Catalog() {
  const {
    weapons,
    loading,
    deleteWeapon,
    updateWeapon,
    addComment,
    purchaseWeapon
  } = useWeapons();

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Все');
  const [selectedWeapon, setSelectedWeapon] = useState(null);

  const location = useLocation();
  const highlightName = location.state?.highlight || '';

  useEffect(() => {
    if (highlightName) {
      setSearch(highlightName);
    }
  }, [highlightName]);

  const filteredWeapons = weapons.filter(w => {
    const matchesCategory = filter === 'Все' || w.category === filter;
    const matchesSearch = w.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleEdit = (weapon) => setSelectedWeapon(weapon);

  const handleSubmit = async (formData) => {
    if (selectedWeapon) {
      await updateWeapon({ ...selectedWeapon, ...formData });
      setSelectedWeapon(null);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        width: '100%',
        margin: 0,
        padding: 0,
        overflowX: 'hidden'
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          minHeight: '100vh',
          padding: '2rem 0'
        }}
      >
        <div className="container">
          <div className="mb-4 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
            <h2 className="mb-0">Каталог оружия</h2>
            <Link to="/add" className="btn btn-outline-light d-flex align-items-center gap-1" style={{ backgroundColor: '#198754' }}>
              <i className="bi bi-plus-circle"></i> <span>Добавить оружие</span>
            </Link>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Поиск по названию..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                value={filter}
                onChange={e => setFilter(e.target.value)}
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

          {selectedWeapon && (
            <WeaponForm
              onSubmit={handleSubmit}
              initialData={selectedWeapon}
            />
          )}

          {loading ? (
            <p>Загрузка...</p>
          ) : (
            <div className="row">
              {filteredWeapons.map(w => (
                <div key={w.id} className="col-md-6 col-lg-4 mb-3">
                  <WeaponCard
                    weapon={w}
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
      </div>
    </div>
  );
}

import React, { useState } from 'react';

function WeaponCard({ weapon, onDelete, onEdit }) {
  const [comments, setComments] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const handleAddComment = () => {
    const text = prompt('Введите комментарий:');
    if (text) {
      const newComment = { id: Date.now(), text };
      setComments(prev => [...prev, newComment]);
    }
  };

  const visibleComments = showAll ? comments : comments.slice(0, 3);
  const hiddenCount = comments.length - visibleComments.length;

  return (
    <div className="card my-3">
      <div className="card-body">
        <h5 className="card-title">{weapon.name}</h5>
        <p className="card-text">{weapon.description}</p>
        <span className="badge bg-primary">{weapon.category}</span>

        <div className="mt-3 d-flex flex-wrap gap-2">
          <button className="btn btn-warning btn-sm" onClick={() => onEdit(weapon)}>
            Редактировать
          </button>
          <button className="btn btn-danger btn-sm" onClick={() => onDelete(weapon.id)}>
            Удалить
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={handleAddComment}
          >
            Добавить комментарий
          </button>
        </div>

        <div className="mt-3">
          <strong>Комментарии:</strong>
          <ul className="list-group my-2">
            {visibleComments.map((c) => (
              <li key={c.id} className="list-group-item p-1">
                {c.text}
              </li>
            ))}
          </ul>
          {hiddenCount > 0 && (
            <button
              className="btn btn-link btn-sm p-0"
              onClick={() => setShowAll(true)}
            >
              ...ещё {hiddenCount}
            </button>
          )}
          {showAll && comments.length > 3 && (
            <button
              className="btn btn-link btn-sm text-danger ps-0"
              onClick={() => setShowAll(false)}
            >
              Скрыть
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default WeaponCard;

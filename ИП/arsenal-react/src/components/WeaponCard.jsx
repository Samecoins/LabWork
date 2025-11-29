// src/components/WeaponCard.jsx
import React, { useState } from 'react';

const WeaponCard = ({
  weapon,
  categoryName,
  onEdit,
  onDelete,
  onPurchase,
  onAddComment,
  highlightName,
}) => {
  const [showAllComments, setShowAllComments] = useState(false);
  const [comments, setComments] = useState(weapon.comments || []);

  const handleAddComment = async () => {
    const text = prompt('Введите комментарий:');
    if (!text) return;

    // локально сразу добавляем
    const localComment = {
      id: Date.now().toString(),
      text,
    };
    setComments((prev) => [...prev, localComment]);

    // и отправляем на бэкенд
    try {
      await onAddComment(weapon.id, text);
    } catch (e) {
      console.error('Failed to add comment', e);
    }
  };

  const isHighlighted = weapon.name === highlightName;

  const visibleComments = showAllComments ? comments : comments.slice(0, 3);

  return (
    <div
      className={`card p-3 mb-3 h-100 ${
        isHighlighted ? 'border border-3 border-warning shadow' : ''
      }`}
    >
      <h5>{weapon.name}</h5>
      <p>{weapon.description}</p>

      <span
        className="badge bg-primary mb-2"
        style={{
          fontSize: '0.75rem',
          padding: '0.35em 0.6em',
          width: 'fit-content',
        }}
      >
        {categoryName || weapon.categoryName || 'Без категории'}
      </span>

      <div className="mb-2 d-flex flex-wrap gap-2">
        <button
          className="btn btn-warning btn-sm"
          onClick={() => onEdit(weapon)}
        >
          <i className="bi bi-pencil me-1" /> Редактировать
        </button>

        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(weapon.id)}
        >
          <i className="bi bi-trash me-1" /> Удалить
        </button>

        <button
          className="btn btn-secondary btn-sm"
          onClick={handleAddComment}
        >
          Добавить комментарий
        </button>

        {!weapon.purchased && (
          <button
            className="btn btn-success btn-sm"
            onClick={() => onPurchase(weapon.id)}
          >
            Купить
          </button>
        )}
      </div>

      {weapon.purchased && (
        <span className="text-success small d-block mt-1">
          ✅ Приобретено
        </span>
      )}

      <div>
        <strong>Комментарии:</strong>
        <ul className="list-group list-group-flush">
          {visibleComments.map((c) => (
            <li
              key={c.id || c.text}
              className="list-group-item px-1 py-1 small"
            >
              {c.text}
            </li>
          ))}
        </ul>
        {comments.length > 3 && (
          <span
            role="button"
            className={`mt-1 d-inline-block small text-${
              showAllComments ? 'danger' : 'primary'
            }`}
            style={{
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
            onClick={() => setShowAllComments((prev) => !prev)}
          >
            {showAllComments
              ? 'Скрыть'
              : `...ещё ${comments.length - 3}`}
          </span>
        )}
      </div>
    </div>
  );
};

export default WeaponCard;

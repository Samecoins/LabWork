import React, { useState } from 'react';

export default function CommentList({ comments }) {
  const [expanded, setExpanded] = useState(false);

  const visibleComments = expanded ? comments : comments.slice(0, 3);
  const hiddenCount = comments.length - 3;

  return (
    <div className="mt-2">
      <h6>Комментарии:</h6>
      <ul className="list-group">
        {visibleComments.map((comment, index) => (
          <li key={index} className="list-group-item py-1 small">
            {comment}
          </li>
        ))}
      </ul>
      {comments.length > 3 && (
        <button
          className="btn btn-link btn-sm px-0 mt-1"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Скрыть комментарии' : `...ещё ${hiddenCount}`}
        </button>
      )}
    </div>
  );
}
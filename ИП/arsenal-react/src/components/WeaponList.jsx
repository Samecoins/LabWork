import React from 'react';
import WeaponCard from './WeaponCard';

function WeaponList({ weapons, onDelete, onEdit }) {
  return (
    <div className="row">
      {weapons.map(weapon => (
        <div className="col-md-6 mb-3" key={weapon.id}>
          <WeaponCard weapon={weapon} onDelete={onDelete} onEdit={onEdit} />
        </div>
      ))}
    </div>
  );
}

export default WeaponList;

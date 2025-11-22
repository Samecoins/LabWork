// src/hooks/useWeapons.js
import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:8080/api/1.0/weapons';
const COMMENT_API = 'http://localhost:8080/api/1.0/comments';

export function useWeapons() {
  const [weapons, setWeapons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeapons();
  }, []);

  const fetchWeapons = async () => {
    setLoading(true);

    const response = await fetch(API_URL);
    const data = await response.json();

    const commentsRes = await fetch(COMMENT_API);
    const commentsData = await commentsRes.json();

    const enriched = data.map(w => ({
      ...w,
      comments: commentsData.filter(c => String(c.weaponId) === String(w.id))
    }));

    setWeapons(enriched);
    setLoading(false);
  };

  const addWeapon = async (weapon) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...weapon, purchased: false })
    });
    const newWeapon = await response.json();
    newWeapon.comments = [];
    setWeapons(prev => [...prev, newWeapon]);
  };

  const deleteWeapon = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    setWeapons(prev => prev.filter(w => w.id !== id));
  };

  const updateWeapon = async (updated) => {
    await fetch(`${API_URL}/${updated.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    });

    setWeapons(prev =>
      prev.map(w => (w.id === updated.id ? { ...w, ...updated } : w))
    );
  };

  const addComment = async (weaponId, comment) => {
    const response = await fetch(COMMENT_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ weaponId: String(weaponId), text: comment.text })
    });
    const newComment = await response.json();
    setWeapons(prev =>
      prev.map(w =>
        String(w.id) === String(weaponId)
          ? { ...w, comments: [...(w.comments || []), newComment] }
          : w
      )
    );
  };

  const purchaseWeapon = async (id) => {
    const weapon = weapons.find(w => w.id === id);

    const updated = { ...weapon, purchased: true };

    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    });

    setWeapons(prev =>
      prev.map(w => (w.id === id ? updated : w))
    );
  };


  return {
    weapons,
    loading,
    addWeapon,
    deleteWeapon,
    updateWeapon,
    addComment,
    purchaseWeapon
  };
}

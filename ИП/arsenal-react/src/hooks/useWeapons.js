// src/hooks/useWeapons.js
import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:8080/api/1.0/weapons';
const COMMENT_API = 'http://localhost:8080/api/1.0/comments';

export function useWeapons() {
  const [weapons, setWeapons] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWeapons = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      setWeapons(data);
    } catch (e) {
      console.error('Failed to load weapons', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeapons();
  }, []);

  const addWeapon = async (weapon) => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: weapon.name,
        description: weapon.description,
        categoryId: weapon.categoryId,
      }),
    });
    const created = await res.json();
    setWeapons((prev) => [...prev, created]);
  };

  const deleteWeapon = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    setWeapons((prev) => prev.filter((w) => w.id !== id));
  };

  const updateWeapon = async (weapon) => {
    const res = await fetch(`${API_URL}/${weapon.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: weapon.name,
        description: weapon.description,
        categoryId: weapon.categoryId,
        purchased: weapon.purchased,
      }),
    });
    const updated = await res.json();
    setWeapons((prev) => prev.map((w) => (w.id === updated.id ? updated : w)));
  };

  const purchaseWeapon = async (id) => {
    const res = await fetch(`${API_URL}/${id}/purchase`, {
      method: 'PATCH',
    });
    const updated = await res.json();
    setWeapons((prev) => prev.map((w) => (w.id === updated.id ? updated : w)));
  };

  const addComment = async (weaponId, text) => {
    const res = await fetch(COMMENT_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ weaponId, text }),
    });
    const newComment = await res.json();

    // обновим комментарии в состоянии
    setWeapons((prev) =>
      prev.map((w) =>
        w.id === weaponId
          ? {
              ...w,
              comments: [...(w.comments || []), newComment],
            }
          : w
      )
    );
  };

  return {
    weapons,
    loading,
    addWeapon,
    deleteWeapon,
    updateWeapon,
    purchaseWeapon,
    addComment,
    reload: fetchWeapons,
  };
}

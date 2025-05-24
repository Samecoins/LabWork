const API_URL = 'http://localhost:3000/weapons';
const COMMENT_API = 'http://localhost:3000/comments';

export const WeaponModel = {
  async getAll() {
    const response = await fetch(API_URL);
    return await response.json();
  },

  async create(weapon) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(weapon)
    });
    return await response.json();
  },

  async update(id, updatedWeapon) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedWeapon)
    });
    return await response.json();
  },

  async delete(id) {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
  },

  async getCommentsForWeapon(weaponId) {
    const response = await fetch(`${COMMENT_API}?weaponId=${weaponId}`);
    return await response.json();
  },

  async addComment(weaponId, text) {
    const response = await fetch(COMMENT_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ weaponId, text })
    });
    return await response.json();
  }
};

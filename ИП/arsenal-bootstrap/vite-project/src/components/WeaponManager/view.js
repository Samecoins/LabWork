export const WeaponView = {
  renderWeaponList(container, weapons) {
    container.innerHTML = '';
    weapons.forEach(w => {
      const card = document.createElement('div');
      card.className = 'card p-3 mb-3';
      card.innerHTML = `
        <h5>${w.title}</h5>
        <p>${w.description}</p>
        <span class="badge bg-secondary">${w.category?.name}</span>
        <button class="btn btn-danger btn-sm mt-2 delete-btn" data-id="${w.id}">Удалить</button>
      `;
      container.appendChild(card);
    });
  }
};

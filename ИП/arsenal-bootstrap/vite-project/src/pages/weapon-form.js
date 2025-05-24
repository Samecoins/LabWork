const API_URL = 'http://localhost:3000/weapons';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('weaponForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const desc = document.getElementById('desc').value.trim();
    const category = document.getElementById('category').value;

    if (!name || !desc || !category) {
      alert('Пожалуйста, заполните все поля.');
      return;
    }

    const newWeapon = { name, desc, category };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newWeapon),
      });

      if (!response.ok) {
        throw new Error('Ошибка при добавлении оружия');
      }

      // После успешного добавления — редирект обратно на список
      window.location.href = '/weapons.html';
    } catch (error) {
      console.error(error);
      alert('Не удалось добавить оружие.');
    }
  });
});

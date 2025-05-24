import { WeaponModel } from './model.js';
import { WeaponController } from './controller.js';

export const WeaponView = {
  renderWeaponList(container, weapons, onEdit, onDelete) {
    container.innerHTML = '';

    weapons.forEach((weapon) => {
      const card = document.createElement('div');
      card.className = 'col-12 col-md-6 d-flex align-items-stretch';

      card.innerHTML = `
        <div class="card shadow-sm w-100 d-flex flex-column">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${weapon.name}</h5>
            <p class="card-text flex-grow-1">${weapon.description}</p>
            <p class="card-text">
              <small class="text-muted">Категория: ${weapon.category}</small>
            </p>

            <div class="d-flex flex-wrap gap-2 mt-2">
              <button class="btn btn-warning btn-sm edit-btn">Редактировать</button>
              <button class="btn btn-danger btn-sm delete-btn">Удалить</button>
              <button class="btn btn-secondary btn-sm comment-btn">Добавить комментарий</button>
            </div>

            <div class="comments mt-3"></div>
          </div>
        </div>
      `;

      const body = card.querySelector('.card-body');

      // События на кнопки
      card.querySelector('.edit-btn').addEventListener('click', () => onEdit(weapon));
      card.querySelector('.delete-btn').addEventListener('click', () => onDelete(weapon.id));
      card.querySelector('.comment-btn').addEventListener('click', () => {
        const text = prompt('Введите комментарий:');
        if (text) {
          WeaponModel.addComment(weapon.id, text).then(() => {
            WeaponController.render();
          });
        }
      });

      // Загрузка и отображение первых 3 комментариев
      WeaponModel.getCommentsForWeapon(weapon.id).then(comments => {
        if (comments.length > 0) {
          const commentsContainer = card.querySelector('.comments');
          const commentsTitle = document.createElement('h6');
          commentsTitle.className = 'mb-1';
          commentsTitle.textContent = 'Комментарии:';

          const commentsList = document.createElement('ul');
          commentsList.className = 'list-group list-group-flush mb-3';

          comments.slice(0, 3).forEach(comment => {
            const li = document.createElement('li');
            li.className = 'list-group-item small';
            li.textContent = comment.text;
            commentsList.appendChild(li);
          });

          commentsContainer.appendChild(commentsTitle);
          commentsContainer.appendChild(commentsList);
        }
      });

      container.appendChild(card);
    });
  },

  showEditForm(weapon, onSubmit) {
    document.getElementById('editId').value = weapon.id;
    document.getElementById('editName').value = weapon.name;
    document.getElementById('editDesc').value = weapon.description;
    document.getElementById('editCategory').value = weapon.category;

    const modal = new bootstrap.Modal(document.getElementById('editModal'));
    modal.show();

    document.getElementById('editWeaponForm').onsubmit = (e) => {
      e.preventDefault();
      const updatedWeapon = {
        id: Number(document.getElementById('editId').value),
        name: document.getElementById('editName').value,
        description: document.getElementById('editDesc').value,
        category: document.getElementById('editCategory').value
      };
      onSubmit(updatedWeapon);
      modal.hide();
    };
  }
};

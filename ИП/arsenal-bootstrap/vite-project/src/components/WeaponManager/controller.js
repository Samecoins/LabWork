import { WeaponModel } from './model.js';
import { WeaponView } from './view.js';

export const WeaponController = {
  async init() {
    this.container = document.getElementById('weapon-list');
    await this.render();
  },

  async render() {
    const weapons = await WeaponModel.getAll();
    WeaponView.renderWeaponList(
      this.container,
      weapons,
      this.handleEdit.bind(this),
      this.handleDelete.bind(this)
    );
  },

  async handleDelete(id) {
    if (confirm('Вы уверены, что хотите удалить оружие?')) {
      await WeaponModel.delete(id);
      await this.render();
    }
  },

  async handleEdit(weapon) {
    // 🛠 Правильное поведение редактирования
    WeaponView.showEditForm(weapon, async (updatedData) => {
      await WeaponModel.update(weapon.id, updatedData);
      await this.render();
    });
  }
};

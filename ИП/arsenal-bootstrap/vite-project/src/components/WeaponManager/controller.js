import { WeaponModel } from './model.js';
import { WeaponView } from './view.js';

export const WeaponController = {
  async init() {
    const container = document.getElementById('weapon-list');
    const weapons = await WeaponModel.getWeapons();
    WeaponView.renderWeaponList(container, weapons);
    container.addEventListener('click', async (e) => {
      if (e.target.classList.contains('delete-btn')) {
        const id = e.target.dataset.id;
        await WeaponModel.deleteWeapon(id);
        this.init();
      }
    });
  }
};

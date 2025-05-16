import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

document.getElementById('addCardForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const desc = document.getElementById('desc').value;

  const col = document.createElement('div');
  col.className = 'col-12 col-sm-6 col-md-4';

  col.innerHTML = `
    <div class="card shadow">
      <div class="card-body">
        <h5 class="card-title">${name} <i class="bi bi-crosshair"></i></h5>
        <p class="card-text">${desc}</p>
        <button class="btn btn-danger btn-sm"><i class="bi bi-trash3"></i> Удалить</button>
      </div>
    </div>
  `;

  col.querySelector('button').addEventListener('click', () => {
    col.remove();
  });

  document.getElementById('cardContainer').appendChild(col);
  this.reset();
});

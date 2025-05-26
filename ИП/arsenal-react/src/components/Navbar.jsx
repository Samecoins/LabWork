import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">Арсенал</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/catalog">Каталог</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/add">Добавить</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/stories">Истории</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/services">Услуги</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contacts">Контакты</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/stats">Статистика</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/advisor">AI-советник</Link></li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

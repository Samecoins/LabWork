import React from 'react';
import background from '../assets/stories-bg.png'; 

export default function Stories() {
  return (
    <div
      className="position-relative"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        paddingTop: '5rem',
        paddingBottom: '5rem',
        color: 'white',
      }}
    >
      {/* Пелена */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 0 }}
      ></div>

      {/* Контент */}
      <div className="container position-relative z-1 bg-dark bg-opacity-75 p-4 rounded shadow" style={{ maxWidth: 900 }}>
        <h2 className="mb-4 text-white">История оружейного магазина "Арсенал"</h2>

        <p>
          Магазин <strong>«Арсенал»</strong> был основан в 2018 году группой энтузиастов, увлечённых военной историей и современным оружием.
          Целью проекта стало создание не просто магазина, а полноценного пространства для ценителей качественного вооружения.
        </p>

        <p>
          Начав с небольшой мастерской по настройке и уходу за оружием, команда «Арсенала» стремительно развивалась. Сегодня магазин предлагает широкий выбор продукции: от охотничьего и спортивного оружия до редких коллекционных экземпляров.
        </p>

        <p>
          Мы гордимся своим вниманием к деталям, честным подходом к клиентам и качественным сервисом. Каждый клиент может рассчитывать не только на профессиональную консультацию, но и на послепродажное обслуживание, модернизацию и поддержку.
        </p>

        <p>
          <strong>Миссия «Арсенала»</strong> — быть надёжным партнёром как для новичков, так и для опытных коллекционеров. Мы работаем, чтобы вооружение стало не просто инструментом, а искусством.
        </p>

        <p className="text-muted small">
          Последнее обновление: май 2025 года
        </p>
      </div>
    </div>
  );
}

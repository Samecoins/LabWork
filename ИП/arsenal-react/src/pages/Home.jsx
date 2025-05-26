import React from 'react';
import bg from '../assets/home-bg.png';

export default function Home() {
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        width: '100%',
        margin: 0,
        padding: 0,
        overflowX: 'hidden'
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255,255,255,0.85)',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '2rem'
        }}
      >
        <div className="container">
          <h1 className="display-5 fw-bold">Добро пожаловать в оружейный магазин "Арсенал"</h1>
          <p className="lead mt-3">
            Здесь вы найдёте широкий выбор оружия: пистолеты, автоматы, ножи — всё с подробным описанием и возможностью покупки.
          </p>
          <p>
            Перейдите в <strong>Каталог</strong>, чтобы ознакомиться с товарами.
          </p>
        </div>
      </div>
    </div>
  );
}

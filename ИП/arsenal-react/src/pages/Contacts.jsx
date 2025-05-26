// src/pages/Contacts.jsx

import React from 'react';
import background from '../assets/contacts-bg.png';

export default function Contacts() {
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
        color: 'white'
      }}
    >
      {/* Пелена */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 0 }}
      ></div>

      {/* Контент */}
      <div className="container position-relative z-1 bg-dark bg-opacity-75 p-4 rounded shadow" style={{ maxWidth: 900 }}>
        <h2 className="mb-4">Контактная информация</h2>
        <p><strong>Адрес:</strong> г. Москва, ул. Оружейная, д. 12</p>
        <p><strong>Телефон:</strong> +7 (495) 123-45-67</p>
        <p><strong>Email:</strong> info@arsenal.ru</p>

        <h5 className="mt-4">Мы на карте:</h5>
        <div className="ratio ratio-16x9">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.0497232649493!2d37.60314421593224!3d55.76745398055662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a63f8995e79%3A0x54144aeb3a4a38e3!2z0JzQsNC90LTRgNCw0LvRjNGB0LrQsNGPINGD0LsuLCDQnNC-0YHQutCy0LAsIDEyLCDQnNC-0YHQutCy0LXRgdC60LjQuSDQv9C10YDQtdC00L7QvdGL0Lkg0LrQvtCz0L7RgNGD0YHRgtCw0L3QsNGPINGD0LsuIDc2NzAwMA!5e0!3m2!1sru!2sru!4v1651923452001!5m2!1sru!2sru"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Карта"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

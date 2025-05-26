// src/pages/Services.jsx

import React, { useState } from 'react';
import background from '../assets/services-bg.png'; // не забудь сохранить изображение в assets

export default function Services() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    comment: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.service) {
      alert('Пожалуйста, заполните обязательные поля');
      return;
    }

    setSubmitted(true);
    setFormData({ name: '', email: '', service: '', comment: '' });
  };

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

      {/* Форма */}
      <div className="container position-relative z-1 bg-dark bg-opacity-75 p-4 rounded shadow" style={{ maxWidth: 900 }}>
        <h2 className="mb-4 text-white">Заказ услуги</h2>

        {submitted && (
          <div className="alert alert-success">
            Ваша заявка успешно отправлена!
          </div>
        )}

        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Ваше имя"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <select
              className="form-select"
              name="service"
              value={formData.service}
              onChange={handleChange}
            >
              <option value="">Выберите услугу</option>
              <option value="Настройка оружия">Настройка оружия</option>
              <option value="Чистка и обслуживание">Чистка и обслуживание</option>
              <option value="Покраска и камуфляж">Покраска и камуфляж</option>
              <option value="Проверка прицела">Проверка прицела</option>
            </select>
          </div>
          <div className="col-12">
            <textarea
              className="form-control"
              rows="3"
              placeholder="Комментарий (необязательно)"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="col-12 text-center">
            <button type="submit" className="btn btn-primary">
              Отправить заявку
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

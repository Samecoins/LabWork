import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const EditModal = ({ show, onClose, weapon, onSave }) => {
  const [formData, setFormData] = useState(weapon);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Редактировать оружие</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Название</Form.Label>
            <Form.Control
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Описание</Form.Label>
            <Form.Control
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Категория</Form.Label>
            <Form.Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="Пистолет">Пистолет</option>
              <option value="Автомат">Автомат</option>
              <option value="Нож">Нож</option>
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit">
            Сохранить изменения
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;

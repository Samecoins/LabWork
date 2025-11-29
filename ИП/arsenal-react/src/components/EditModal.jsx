import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useCategories } from "../hooks/useCategories";

const EditModal = ({ show, onClose, weapon, onSave }) => {
  const [formData, setFormData] = useState(weapon || {});

  const { categories, loading } = useCategories();

  useEffect(() => {
    setFormData(weapon || {});
  }, [weapon]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.categoryId) {
      return alert("Все поля обязательны");
    }
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
              value={formData.name || ""}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Описание</Form.Label>
            <Form.Control
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Категория</Form.Label>
            <Form.Select
              name="categoryId"
              value={formData.categoryId || ""}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="">Выберите категорию</option>
              {!loading &&
                categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
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

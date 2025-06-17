import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ManageTenantModal = ({ tenant, show, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    domain: '',
    email: '',
    isActive: true,
    plan: 'Free',
  });

  // Populate form with tenant data when modal opens
  useEffect(() => {
    if (tenant && tenant._id) {
      const domain = tenant.domain || '';
      setFormData({
        name: tenant.name || '',
        domain: domain,
        email: `admin@${domain}`,
        isActive: tenant.isActive !== undefined ? tenant.isActive : true,
        plan: tenant.plan || 'Free',
      });
    }
  }, [tenant]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'isActive') {
      setFormData((prev) => ({
        ...prev,
        isActive: value === 'true',
      }));
    } else if (name === 'domain') {
      setFormData((prev) => ({
        ...prev,
        domain: value,
        email: `admin@${value}`, // Auto-generate email
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(tenant._id, formData); // Send updated data to parent
    onClose(); // Close modal
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Manage Tenant</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Tenant Name</Form.Label>
            <Form.Control
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Domain</Form.Label>
            <Form.Control
              name="domain"
              value={formData.domain}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Plan</Form.Label>
            <Form.Select name="plan" value={formData.plan} onChange={handleChange}>
              <option value="Free">Free</option>
              <option value="Basic">Basic</option>
              <option value="Premium">Premium</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="isActive"
              value={formData.isActive ? 'true' : 'false'}
              onChange={handleChange}
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ManageTenantModal;

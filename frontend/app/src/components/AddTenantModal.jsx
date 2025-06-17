import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createTenant } from '../redux/actions/tenantAction';
import { TENANT_CREATE_RESET } from '../redux/constants/tenantConstant';

const AddTenantModal = ({ show, handleClose }) => {
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector(state => state.tenantCreate || {});

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    plan: 'Free',
    subscribedProducts: []
  });

  useEffect(() => {
    if (show && success) {
      handleClose(); // close modal
      setFormData({
        name: '',
        email: '',
        phone: '',
        plan: 'Free',
        subscribedProducts: []
      });
      dispatch({ type: TENANT_CREATE_RESET }); // reset success state
    }
  }, [show, success, dispatch, handleClose]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTenant(formData));
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add New Tenant</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group className="mb-3">
            <Form.Label>Name *</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email *</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Plan</Form.Label>
            <Form.Select
              name="plan"
              value={formData.plan}
              onChange={handleChange}
            >
              <option value="Free">Free</option>
              <option value="Basic">Basic</option>
              <option value="Premium">Premium</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                {' Creating...'}
              </>
            ) : (
              'Create Tenant'
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddTenantModal;

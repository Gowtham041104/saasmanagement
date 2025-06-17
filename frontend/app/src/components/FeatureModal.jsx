import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateProductFeatures } from '../redux/actions/productAction';

const FeatureModal = ({ show, handleClose, product }) => {
  const dispatch = useDispatch();
  const [features, setFeatures] = useState(product.features || {});

  const toggleFeature = (key) => {
    setFeatures({ ...features, [key]: !features[key] });
  };

  const handleSave = () => {
    dispatch(updateProductFeatures(product._id, features));
    handleClose();
  };

  const featureList = [
    'Analytics',
    'Custom Dashboards',
    'Scheduled Reports',
    'Data Export',
    'API Access',
    'Predictive Analytics',
    'Marketing',
    'Support'
  ];

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Manage Features for {product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {featureList.map((feature) => (
            <Form.Check
              key={feature}
              type="switch"
              id={feature}
              label={feature}
              checked={features[feature] || false}
              onChange={() => toggleFeature(feature)}
            />
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FeatureModal;

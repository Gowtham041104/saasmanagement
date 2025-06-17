import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ProductList = ({ products, onSelect }) => {
  return (
    <div className="row">
      {products.map((product) => (
        <div className="col-md-4 mb-3" key={product._id}>
          <Card onClick={() => onSelect(product)} className="cursor-pointer">
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <Button variant="primary" size="sm">Manage Features</Button>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default ProductList;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../redux/actions/productAction';
import ProductList from '../screens/ProductList';
import FeatureModal from '../components/FeatureModal'; // new modal

const ProductScreen = () => {
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Manage Product Features</h2>

      {loading ? (
        <div className="text-center">Loading products...</div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : (
        <ProductList products={products} onSelect={handleProductClick} />
      )}

      {selectedProduct && (
        <FeatureModal
          show={!!selectedProduct}
          handleClose={() => setSelectedProduct(null)}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default ProductScreen;

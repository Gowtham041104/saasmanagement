const express = require('express');
const router = express.Router();
const {
  getProductsByClient,
  createProduct,
  updateProduct,
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

// Features routes (simplified)
router.get('/client/:clientId', protect, getProductsByClient);
router.post('/', protect, createProduct);
router.put('/:id', protect, updateProduct);

module.exports = router;

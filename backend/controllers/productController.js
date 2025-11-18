// controllers/productController.js - Simplified for Features only
const Product = require('../models/Product');
const Tenant = require('../models/Tenant');

// GET features for a specific tenant
exports.getProductsByClient = async (req, res) => {
  try {
    const { clientId } = req.params;

    // Verify tenant exists
    const tenant = await Tenant.findById(clientId);
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }

    const products = await Product.find({ client: clientId }).populate('client', 'name email');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Helper: derive enabled feature IDs from the features map
const getEnabledFeatureIds = (features = {}) => {
  return Object.entries(features || {})
    .filter(([, value]) => value === true)
    .map(([key]) => key);
};

// CREATE or UPDATE features for a tenant
exports.createProduct = async (req, res) => {
  try {
    const { features, clientId } = req.body;

    // Verify tenant exists
    const tenant = await Tenant.findById(clientId);
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }

    // Check if features already exist for this tenant
    let product = await Product.findOne({ client: clientId });
    
    if (product) {
      // Update existing features
      product.features = features;
      await product.save();
    } else {
      // Create new features document
      product = new Product({
        name: 'Features',
        features,
        client: clientId,
      });
      await product.save();
    }

    // Update tenant's subscribedProducts list based on enabled features
    tenant.subscribedProducts = getEnabledFeatureIds(features);
    await tenant.save();

    const populatedProduct = await Product.findById(product._id).populate(
      'client',
      'name email'
    );
    res.status(201).json(populatedProduct);
  } catch (err) {
    res.status(400).json({ message: 'Failed to save features', error: err.message });
  }
};

// UPDATE features for a tenant
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { features } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Features not found' });
    }

    // Update features on the product
    product.features = features;
    await product.save();

    // Also update tenant's subscribedProducts list
    const tenant = await Tenant.findById(product.client);
    if (tenant) {
      tenant.subscribedProducts = getEnabledFeatureIds(features);
      await tenant.save();
    }

    const updatedProduct = await Product.findById(product._id).populate(
      'client',
      'name email'
    );

    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update features', error: err.message });
  }
};

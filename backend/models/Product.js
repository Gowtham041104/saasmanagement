// models/Product.js - Simplified for Features only
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Features',
    trim: true,
  },
  features: {
    type: Map,
    of: Boolean,
    default: {}
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant',
    required: [true, 'Tenant is required'],
  },
}, { 
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      // Convert Map to plain object for JSON serialization
      if (ret.features instanceof Map) {
        ret.features = Object.fromEntries(ret.features);
      }
      return ret;
    }
  }
});

// Index for faster queries
productSchema.index({ client: 1 });

module.exports = mongoose.model('Product', productSchema);

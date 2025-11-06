const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
  getUserStats,
} = require('../controllers/userController');

// All routes require authentication
router.use(protect);

// User profile routes
router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.delete('/profile', deleteUserAccount);

// User statistics
router.get('/stats', getUserStats);

module.exports = router;

const express = require('express');
const router = express.Router();

const{
    getAllTenants,createTenant,updateTenant,deleteTenant,
}= require('../controllers/tenantController')

router.route('/').get(getAllTenants).post(createTenant);
router.route('/:id') .put(updateTenant)
  .delete(deleteTenant);

module.exports = router;
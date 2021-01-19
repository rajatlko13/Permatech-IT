const express = require('express');
const router = express.Router();

const customerController = require('../controller/customerController');

router.get('/', customerController.getCustomerList);
router.get('/:id', customerController.getCustomer);
router.post('/', customerController.addCustomer);

module.exports = router;
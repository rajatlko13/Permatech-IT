const express = require('express');
const router = express.Router();

const orderController = require('../controller/orderController');

router.get('/', orderController.getOrderList);
router.get('/:id', orderController.getOrder);
router.get('/customer/:id', orderController.getOrderByCustomerId);
router.post('/:id', orderController.addOrder);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.removeOrder);

module.exports = router;
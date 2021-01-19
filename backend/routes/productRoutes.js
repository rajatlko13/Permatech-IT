const express = require('express');
const router = express.Router();

const productController = require('../controller/productController');

router.get('/', productController.getProductList);
router.get('/:id', productController.getProduct);
router.post('/', productController.addProduct);

module.exports = router;
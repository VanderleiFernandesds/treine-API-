const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Quando chegar um GET em /api/products, chama o controller responsável.
router.get('/products', productController.getProducts);

module.exports = router;

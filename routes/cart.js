const express = require('express');
const router = express.Router();
const cartController = require('../controller/cart_controller');

// Routes for cart management
router.get('/', cartController.getCart);
router.post('/add', cartController.addToCart);
router.put('/update/:productId', cartController.updateCartItem);
router.delete('/remove/:productId', cartController.removeCartItem);

module.exports = router;

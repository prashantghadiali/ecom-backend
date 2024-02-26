const express = require('express');
const router = express.Router();

// getting products controller
const productController = require("../controller/products_controller");

// get requests with pre tag "/products"
// router.get('/', productsController.stdlist);

// post requests with pre tag "/create"

// router.post('/create', productsController.products);


// Routes for CRUD operations on products
router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');

// getting user controller
const userController = require('../controller/user_controller');

// get request with pre route "/user"

// Routes for CRUD operations on users
router.post('/create', userController.createUser);
router.get('/:id', requireAuth, userController.getUserById);
router.put('/:id', requireAuth, userController.updateUser);
router.delete('/:id', requireAuth, userController.deleteUser);

module.exports = router;




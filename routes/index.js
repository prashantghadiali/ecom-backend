var express = require('express');
var router = express.Router();
// Require the cookie-parser middleware
// var cookieParser = require('cookie-parser');

const authController = require('../controller/authController');
const { requireAuth } = require('../middleware/auth');


console.log("Router Loaded");

// router.use(cookieParser())

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Ecom App' });
});

// Signup route
router.post('/signup', authController.signup);

// Login route
router.post('/login', requireAuth, authController.login);

router.use('/product', require('./products'));

router.use('/cat', require('./category'));

router.use('/users', require('./users'));

module.exports = router;

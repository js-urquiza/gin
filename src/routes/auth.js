const express = require("express");
const router = express.Router();

const authController = require('../controllers/authController');

/* GET home page. */
router.get('/register', authController.showRegister);
router.get('/login', authController.showLogin);

module.exports = router;
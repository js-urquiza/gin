const express = require("express");
const router = express.Router();

const authController = require('../controllers/authController');

const fileUpload = require('../middlewares/multerUsersRegister');

router.get('/register', authController.showRegister);
router.post('/register', fileUpload.single('profilePhoto'), authController.register);
router.get('/login', authController.showLogin);

module.exports = router;
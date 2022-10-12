const express = require("express");
const router = express.Router();

const authController = require('../controllers/authController');

const fileUpload = require('../middlewares/multerUsersRegister');
const userRegisterValidation = require('../middlewares/validationRegister');

router.get('/register', authController.showRegister);
router.post('/register', fileUpload.single('profilePhoto'), userRegisterValidation, authController.register);

router.get('/login', authController.showLogin);
router.post('/login', authController.login);

router.get('/logout', authController.logout);

router.get('/dashboard', authController.showDashboard);

module.exports = router;
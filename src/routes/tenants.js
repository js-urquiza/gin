const express = require("express");
const router = express.Router();

const tenantsController = require('../controllers/tenantsController');
const multerTenantsPhoto = require('../middlewares/multerTenantsRegister');

router.get("/", tenantsController.listForLandlord);
router.get('/create', tenantsController.showCreate);
router.post('/create', multerTenantsPhoto.single('propertyPhoto'), tenantsController.create);

module.exports = router;

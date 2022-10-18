const express = require("express");
const router = express.Router();

const propertiesController = require('../controllers/propertiesController');
const multerPropertiesPhoto = require('../middlewares/multerPropertiesPhoto');

router.get("/", propertiesController.listForLandlord);
router.get('/create', propertiesController.showCreate);
router.post('/create', multerPropertiesPhoto.single('propertyPhoto'), propertiesController.create);

module.exports = router;

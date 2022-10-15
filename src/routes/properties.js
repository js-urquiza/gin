const express = require("express");
const router = express.Router();

const propertiesController = require('../controllers/propertiesController');

router.get("/", propertiesController.listForLandlord);
router.get('/create', propertiesController.showCreate);
router.post('/create', propertiesController.create);

module.exports = router;

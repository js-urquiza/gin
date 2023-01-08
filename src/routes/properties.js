const express = require("express");
const router = express.Router();

const propertiesController = require('../controllers/propertiesController');
const multerPropertiesPhoto = require('../middlewares/multerPropertiesPhoto');

router.get("/", propertiesController.listForLandlord);
router.get('/create', propertiesController.showCreate);
router.post('/create', multerPropertiesPhoto.single('propertyPhoto'), propertiesController.create);
router.get('/:id/detail', propertiesController.detail);
router.get('/:id/edit', propertiesController.showEdit);
router.put('/:id/update',multerPropertiesPhoto.single('propertyPhoto'), propertiesController.update);
router.delete('/:id/delete', propertiesController.delete);

module.exports = router;

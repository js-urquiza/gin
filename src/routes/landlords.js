const express = require('express');
const router = express.Router();

const landlordsController = require('../controllers/landlordsController');
const multerLandlordRegister = require('../middlewares/multerLandlordRegister');

router.get('/', landlordsController.list);
router.get('/create', landlordsController.showCreate);
router.post('/create', multerLandlordRegister.single('profilePhoto'), landlordsController.create);
router.get('/createSelf', landlordsController.showCreateSelf);

router.get('/dashboard/:landlordId', landlordsController.dashboard);

module.exports = router;
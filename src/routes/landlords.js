const express = require('express');
const router = express.Router();

const landlordsController = require('../controllers/landlordsController');

router.get('/', landlordsController.list);
router.get('/create', landlordsController.showCreate);
router.post('/create', landlordsController.create);
router.get('/createSelf', landlordsController.showCreateSelf);

router.get('/dashboard/:landlordId', landlordsController.dashboard);

module.exports = router;
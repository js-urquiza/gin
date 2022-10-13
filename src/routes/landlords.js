const express = require('express');
const router = express.Router();

const landlordsController = require('../controllers/landlordsController');

router.get('/landlords', landlordsController.list);
router.get('/landlords/create', landlordsController.showCreate);
router.post('/landlords/create', landlordsController.create);
router.get('/landlords/createSelf', landlordsController.showCreateSelf);

router.get('/landlords/:id', landlordsController.showContracts);

module.exports = router;
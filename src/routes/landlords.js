const express = require('express');
const router = express.Router();

const landlordsController = require('../controllers/landlordsController');

router.get('/landlords', landlordsController.list);

module.exports = router;
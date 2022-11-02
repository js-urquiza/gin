const express = require("express");
const router = express.Router();

const contractsController = require("../controllers/contractsController");

router.get("/", contractsController.list);
router.get('/create', contractsController.showCreate);
router.post('/create', contractsController.create);
router.get('/:id', contractsController.detail);

module.exports = router;

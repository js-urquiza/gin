const express = require("express");
const router = express.Router();

const contractsController = require("../controllers/contractsController");

//Empiezan en /contracts
router.get("/", contractsController.list);
router.get('/search', contractsController.listForSearch);

router.get('/create', contractsController.showCreate);
router.post('/create', contractsController.create);

router.get('/balance/:id', contractsController.balance);

router.get('/:id', contractsController.detail);

module.exports = router;

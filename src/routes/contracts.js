const express = require("express");
const router = express.Router();

const contractsController = require("../controllers/contractsController");

router.get("/contracts", contractsController.list);

module.exports = router;

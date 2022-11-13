const express = require("express");
const router = express.Router();

const expensesController = require("../controllers/expensesController");

router.post("/create", expensesController.create);

module.exports = router;

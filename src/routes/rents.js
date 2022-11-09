const express = require("express");
const router = express.Router();

const rentsController = require("../controllers/rentsController");

router.post("/create", rentsController.create);

module.exports = router;

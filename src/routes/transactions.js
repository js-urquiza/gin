const express = require("express");
const router = express.Router();

const transactionsController = require("../controllers/transactionsController");

router.post("/create", transactionsController.create);
router.delete("/:id/delete", transactionsController.destroy);

module.exports = router;

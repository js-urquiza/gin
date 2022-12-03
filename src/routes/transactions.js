const express = require("express");
const router = express.Router();

const transactionsController = require("../controllers/transactionsController");

router.put('/:id/update', transactionsController.update);
router.delete("/:id/delete", transactionsController.destroy);

module.exports = router;

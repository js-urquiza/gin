const express = require("express");
const router = express.Router();

const paymentsController = require("../controllers/paymentsController");

router.post("/create", paymentsController.create);
router.get('/checkout', paymentsController.checkout);

module.exports = router;

const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
const landlordsRouter = require('./landlords');
const contractsRouter = require('./contracts');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Rentalis' });
});
/* Routers */
router.use(authRouter);
router.use('/landlords', landlordsRouter);
router.use('/contracts',contractsRouter);

module.exports = router;

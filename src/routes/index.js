const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
const landlordsRouter = require('./landlords');
const contractsRouter = require('./contracts');
const propertiesRouter = require('./properties');
const tenantsRouter = require('./tenants');
const rentsRouter = require('./rents');
const expensesRouter = require('./expenses');
const transactionsRouter = require('./transactions');
const paymentsRouter = require('./payments');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Rentalis' });
});
/* Routers */
router.use(authRouter);
router.use('/landlords', landlordsRouter);
router.use('/contracts',contractsRouter);
router.use('/properties', propertiesRouter);
router.use('/tenants', tenantsRouter);
router.use('/rents', rentsRouter);
router.use('/expenses', expensesRouter);
router.use('/payments', paymentsRouter);
router.use('/transactions', transactionsRouter);

module.exports = router;

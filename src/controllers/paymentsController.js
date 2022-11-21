const db = require("../database/models");
const aux = require("../utils/functions");

module.exports = {
  create: async function (req, res) {

    let mes = req.body.mes;
    let anio = req.body.anio;
    let fecha = anio + '-' + mes + '-' + 10;

    try {

      db.Transactions.create({
        contractId: req.session.contractIdInUse,
        date: new Date(fecha),
        name: 'Pago',
        amount: -req.body.amount,
        coeff: 1,
        details: req.body.details
      })

    } catch (error) {
      console.error(error);
    }

    res.redirect("back");
  },
};

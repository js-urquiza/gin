const db = require("../database/models");
const aux = require("../utils/functions");

module.exports = {
  create: async function (req, res) {
    let fecha = req.body.initialDate;
    let duracion = req.body.duration;
    let nombre = req.body.name;
    let precio = req.body.amount;
    let coeficiente = req.body.coeff;
    let contrato = req.session.contractIdInUse;

    try {
      aux.createPeriodicExpense(fecha, duracion, nombre, precio, coeficiente, contrato);
    } catch (error) {
      console.error(error);
    }

    res.redirect("back");
  },
};

const { where } = require("sequelize");
const db = require("../database/models");
const aux = require('../utils/functions');

module.exports = {
  createRent: async function (req, res) {
    //No se está usando

    let fecha = req.body.initialDate;
    let duracion = req.body.duration;
    let precio = req.body.amount;
    let contrato = req.session.contractIdInUse;

    try {
      aux.createPeriodicRent(fecha, duracion, precio, contrato);
    } catch (error) {
      console.error(error);
    }

    res.redirect("back");
  },

  createExpense: async function (req, res) {
    let fecha = req.body.initialDate;
    let duracion = req.body.duration;
    let nombre = req.body.name;
    let precio = req.body.amount;
    let coeficiente = req.body.coeff;
    let contrato = req.session.contractIdInUse;

    try {
      aux.createPeriodicExpense(
        fecha,
        duracion,
        nombre,
        precio,
        coeficiente,
        contrato
      );
    } catch (error) {
      console.error(error);
    }

    res.redirect("back");
  },

  update: async function(req, res) {
    await db.Transactions.update(
      {
        name: req.body.editName,
        amount: req.body.editAmount
      },
      {
        where: {
          id: req.params.id
        }
      }
    );

    res.redirect('back');
  },

  destroy: async function (req, res) {
    await db.Transactions.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.redirect("back");
  },
};

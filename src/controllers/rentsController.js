const db = require("../database/models");
const aux = require("../utils/functions");

module.exports = {
  create: async function (req, res) {
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

  currentRent: async function (req, res) {
    contrato = await db.Contracts.findOne({
      where: {
        id: req.params.id,
      },
      include: ["landlord", "tenant", "property", "transactions"],
    });

    req.session.contractIdInUse = req.params.id;

    let transacciones = await db.Transactions.findAll({
      where: {
        contractId: req.params.id,
      },
      order: [["date", "ASC"]],
    });

    let transaccionesPorFecha = await db.Transactions.findAll({
      where: {
        contractId: req.params.id,
      },
      order: [["date", "ASC"]],
      attributes: [
        "date",
        [sequelize.fn("SUM", sequelize.col("amount")), "total"],
        [sequelize.fn("COUNT", sequelize.col("amount")), "cantidad"],
      ],
      group: "date",
      raw: true,
    });

    res.render("rentOfCurrentMonth", {
      title: "Detalle",
      contrato,
      transacciones,
      transaccionesPorFecha,
    });
  },
};

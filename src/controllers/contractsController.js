const { sequelize } = require('../database/models');
const { Op } = require("sequelize");
const db = require('../database/models');
const aux = require('../utils/functions');

module.exports = {
  list: async function (req, res) {
    let propietario = await db.Landlords.findOne({
      where: {
        id: req.session.landlordIdInUse,
      },
    });

    let contratos = await db.Contracts.findAll({
      where: {
        landlordId: req.session.landlordIdInUse,
      },
      include: ["tenant", "property"],
    });

    console.log(contratos);

    res.render("contractsForLandlord", {
      title: "Contratos",
      propietario,
      contratos,
    });
  },

  listForSearch: async function (req, res) {
    let propietario = await db.Landlords.findOne({
      where: {
        id: req.session.landlordIdInUse,
      },
    });

    let contratos = await db.Contracts.findAll({
      where: {
        landlordId: req.session.landlordIdInUse,
      },
      include: ["tenant", "property"],
    });

    console.log(contratos);

    res.render("contractsForLandlordSearch", {
      title: "Contratos",
      propietario,
      contratos,
    });
  },

  showCreate: async function (req, res) {
    let propietario = await db.Landlords.findOne({
      where: {
        id: req.session.landlordIdInUse,
      },
    });

    let inquilinos = await db.Tenants.findAll({
      where: {
        landlordId: req.session.landlordIdInUse,
      },
    });

    let propiedades = await db.Properties.findAll({
      where: {
        landlordId: req.session.landlordIdInUse,
      },
    });

    console.log(inquilinos);

    res.render("contractsCreate", {
      title: "Nuevo contrato",
      propietario,
      inquilinos,
      propiedades,
    });
  },

  create: async function (req, res) {
    await db.Contracts.create({
      ...req.body,
      landlordId: req.session.landlordIdInUse,
    });

    res.redirect("/contracts");
  },

  detail: async function (req, res) {
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
      order: [["period", "ASC"]],
    });

    let transaccionesPorFecha = await db.Transactions.findAll({
      where: {
        contractId: req.params.id,
      },
      order: [["period", "ASC"]],
      attributes: [
        "period",
        [sequelize.fn("SUM", sequelize.col("amount")), "total"],
        [sequelize.fn("COUNT", sequelize.col("amount")), "cantidad"],
      ],
      group: "period",
      raw: true,
    });

    res.render("contractsDetail", {
      title: "Detalle",
      contrato,
      transacciones,
      transaccionesPorFecha,
    });
  },

  balance: async function(req, res) {
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
      order: [["period", "ASC"]],
    });

    let tpf = await db.Transactions.findAll({
      where: {
        contractId: req.params.id,
        period: {[Op.lte]: new Date(aux.currentPeriod())}
      },
      order: [["period", "ASC"]],
      attributes: [
        "period",
        [sequelize.fn("SUM", sequelize.col("amount")), "total"],
        [sequelize.fn("COUNT", sequelize.col("amount")), "cantidad"],
      ],
      group: "period",
      raw: true,
    });

    let transaccionesPorFecha = tpf.filter(t => t.total > 0);

    //res.send(tpf);

    res.render("contractBalance", {
      title: "Situación del mes",
      contrato,
      transacciones,
      transaccionesPorFecha,
    });
  }
};
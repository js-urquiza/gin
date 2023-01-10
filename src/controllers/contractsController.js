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

    let smallNavConfig = {
      backBtn: "/landlords/dashboard/" + propietario.id,
      h1: req.session.loggedUser.name + " " + req.session.loggedUser.lastName,
      newBtn: "/contracts/create",
      searchBtn: "yes",
    };

    res.render("contractsForLandlord", {
      title: "Contratos",
      smallNavConfig,
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

    let smallNavConfig = {
      backBtn: "/landlords/dashboard/" + propietario.id,
      h1: req.session.loggedUser.name + " " + req.session.loggedUser.lastName,
      newBtn: "",
      searchBtn: "",
    };

    res.render("contractsCreate", {
      title: "Nuevo contrato",
      smallNavConfig,
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
    
    let propietario = await db.Landlords.findOne({
      where: {
        id: req.session.landlordIdInUse,
      },
    });
    
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
      order: [["period", "ASC"], ["name", "ASC"]],
    });

    let transaccionesPorPeriodo = await db.Transactions.findAll({
      where: {
        contractId: req.params.id,
      },
      order: [["period", "ASC"]],
      attributes: [
        "period",
        [sequelize.literal("SUM(`amount`/`coeff`)"), "total"], // Dentro de literal ejecuta una consulta escrita en SQL.
        [sequelize.fn("COUNT", sequelize.col("amount")), "cantidad"],
      ],
      group: "period",
      raw: true,
    });

    let smallNavConfig = {
      backBtn: "/landlords/dashboard/" + propietario.id,
      h1: req.session.loggedUser.name + " " + req.session.loggedUser.lastName,
      newBtn: "",
      searchBtn: "",
    };

    res.render("contractsDetail", {
      title: "Detalle",
      smallNavConfig,
      contrato,
      transacciones,
      transaccionesPorPeriodo,
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

    let transaccionesPorPeriodo = await db.Transactions.findAll({
      where: {
        contractId: req.params.id,
        period: { [Op.lte]: new Date(aux.currentPeriod()) }, // Busca las transacciones hasta la fecha actual.
      },
      order: [["period", "DESC"]],
      attributes: [
        "period",
        [sequelize.literal("SUM(`amount`/`coeff`)"), "total"], // Dentro de literal ejecuta una consulta escrita en SQL.
        [sequelize.fn("COUNT", sequelize.col("amount")), "cantidad"],
      ],
      group: "period",
      raw: true,
    });

    // let transaccionesPorFecha = transaccionesPorPeriodo.filter(t => t.total > 0); // Busca solo los periodos con deuda.

    //res.send(tpf);

    res.render("contractBalance", {
      title: "Situación del mes",
      contrato,
      transacciones,
      transaccionesPorPeriodo,
    });
  }
};
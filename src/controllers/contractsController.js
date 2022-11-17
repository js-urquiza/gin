const { sequelize } = require('../database/models');
const db = require('../database/models');

module.exports = {
  list: async function (req, res) {
    
    let propietario = await db.Landlords.findOne({
      where: {
        id: req.session.landlordIdInUse
      }
    });
    
    let contratos = await db.Contracts.findAll({
      where: {
        landlordId: req.session.landlordIdInUse,
      },
      include: ["tenant", "property"],
    });

    console.log(contratos);
    
    res.render('contractsForLandlord', {title: 'Contratos', propietario, contratos});

  },

  showCreate: async function(req, res) {
    
    let propietario = await db.Landlords.findOne({
      where: {
        id: req.session.landlordIdInUse
      }
    });

    let inquilinos = await db.Tenants.findAll({
      where: {
        landlordId: req.session.landlordIdInUse
      }
    });

    let propiedades = await db.Properties.findAll({
      where: {
        landlordId: req.session.landlordIdInUse
      }
    });

    console.log(inquilinos);

    res.render('contractsCreate', {title: 'Nuevo contrato', propietario, inquilinos, propiedades});

  },

  create: async function(req, res) {

    await db.Contracts.create({
      ...req.body,
      landlordId: req.session.landlordIdInUse
    });

    res.redirect('/contracts');

  },

  detail: async function(req, res) {
    
    contrato = await db.Contracts.findOne({
      where: {
        id: req.params.id
      },
      include: ['landlord', 'tenant', 'property', 'transactions']
    });

    req.session.contractIdInUse = req.params.id;

    let transacciones = await db.Transactions.findAll({
      where: {
        contractId: req.params.id
      },
      order: [['date', 'ASC']],
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
    
    res.render('contractsDetail', {title: 'Detalle', contrato, transacciones, transaccionesPorFecha});

  }
};
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

    let propietario = await db.Landlords.findOne({
      where: {
        id: req.session.landlordIdInUse,
      },
    });
    
    contrato = await db.Contracts.findOne({
      where: {
        id: req.params.id
      },
      include: ['landlord', 'tenant', 'property']
    });

    let rentas = await db.Rents.findAll({
      where: {
        contractId: req.params.id
      }
    });

    req.session.contractIdInUse = req.params.id;

    res.render('contractsDetail', {title: 'Contrato', propietario, contrato, rentas});

  }
};
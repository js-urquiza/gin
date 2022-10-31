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
    });
    
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

    res.render('contractsCreate', {title: 'Nuevo contrato', propietario, inquilinos, propiedades});

  }
};